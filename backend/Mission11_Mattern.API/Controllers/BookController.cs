using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Mattern.API.Data;

namespace Mission11_Mattern.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        public IActionResult GetBooks([FromQuery] List<string> Category, int pageHowMany = 10, int pageNum = 1, string sortOrder = "asc")
        {
            var booksQuery = _context.Books.AsQueryable();

            if (Category != null && Category.Any())
            {
                booksQuery = booksQuery.Where(b => Category.Contains(b.Category));
            }

            booksQuery = sortOrder.ToLower() == "asc"
                ? booksQuery.OrderBy(b => b.Title)
                : booksQuery.OrderByDescending(b => b.Title);

            var totalBooks = booksQuery.Count();
            var books = booksQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalBooks = totalBooks
            });
        }


        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookTypes = _context.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }
    }
}
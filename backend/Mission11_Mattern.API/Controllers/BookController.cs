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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            if (newBook == null)
            {
                return BadRequest("Book cannot be null");
            }

            _context.Books.Add(newBook);
            _context.SaveChanges();

            return Ok(newBook);
        }

        [HttpPut("Update/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            if (updatedBook == null)
            {
                return BadRequest("Book cannot be null");
            }

            var existingBook = _context.Books.Find(bookId);
            if (existingBook == null)
            {
                return NotFound("Book not found");
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("Delete/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
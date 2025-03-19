import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`https://localhost:5000/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${isAscending ? "asc" : "desc"}`);
                const data = await response.json();

                setBooks(data.books);
                setTotalItems(data.totalBooks);
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [pageSize, pageNum, isAscending]); // ✅ Added `isAscending` to dependencies

    return (
        <>
            <br />
            {/* Sorting Button */}
            <div className="text-start">
                <button className="btn btn-primary" onClick={() => setIsAscending(!isAscending)}>
                    Sort by Title {isAscending ? "▲" : "▼"}
                </button>
            </div>
            <br />
            <br />

            {books.map((p) => (
                <div id="bookCard" className="card" key={p.bookId}>
                    <h3>{p.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {p.author}</li>
                            <li><strong>Publisher:</strong> {p.publisher}</li>
                            <li><strong>ISBN:</strong> {p.isbn}</li>
                            <li><strong>Classification:</strong> {p.classification}</li>
                            <li><strong>Category:</strong> {p.category}</li>
                            <li><strong>Page Count:</strong> {p.pageCount}</li>
                            <li><strong>Price:</strong> ${p.price.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>
            ))}

            {/* Pagination Buttons */}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>
                    {i + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />

            {/* Results Per Page Selection */}
            <label>
                Results per page:
                <select 
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;

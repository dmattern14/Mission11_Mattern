import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories}: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadBooks = async () => {

            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, isAscending);

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
                setError("Failed to load books. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, isAscending, selectedCategories]); 

    if (loading) {
        return <div>Loading Books...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

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
                <div id="bookCard" className="card" key={p.bookID}>
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

                        <button className="btn btn-success" onClick={() => navigate(`/donate/${p.title}/${p.bookID}/${p.price}`)}>Buy</button>
                    </div>
                </div>
            ))}

           <Pagination
           currentPage={pageNum}
           totalPages={totalPages}
           pageSize={pageSize}
           onPageChange={setPageNum}
           onPageSizeChange={(newSize) => {
               setPageSize(newSize);
               setPageNum(1);}}
            />
        </>
    );
}

export default BookList;

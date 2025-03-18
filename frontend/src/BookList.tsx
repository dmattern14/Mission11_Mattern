import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("https://localhost:5000/api/Book");
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
            <h1>Book List</h1>
            <br />
            {books.map((p) => (
                <div id="bookcard" key={p.bookId}>
                    <h3>{p.title}</h3>
                    <ul>
                        <li>Author: {p.author}</li>
                        <li>Publisher: {p.publisher}</li>
                        <li>ISBN: {p.isbn}</li>
                        <li>Classification: {p.classification}</li>
                        <li>Category: {p.category}</li>
                        <li>Page Count: {p.pageCount}</li>
                        <li>Price: ${p.price.toFixed(2)}</li>
                    </ul>
                </div>
            ))}
        </>
    );
}

export default BookList;

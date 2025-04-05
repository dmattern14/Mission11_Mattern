import { Book } from "../types/Book";

interface FetchBooksResponse {
  totalBooks: number;
  books: Book[];
  total: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  isAscending: boolean
): Promise<FetchBooksResponse> => {
    const categoryParams = selectedCategories
            .map((cat) => `Category=${encodeURIComponent(cat)}`)
            .join('&');

            try {
                const response = await fetch(`https://localhost:5000/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}&sortOrder=${isAscending ? "asc" : "desc"}`,
                    {
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error fetching books:", error);
                throw error;
                }
            };

            export const addBook = async (newBook: Book): Promise<Book> => {
                try {
                    const response = await fetch("https://localhost:5000/api/Book/AddBook", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(newBook),
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error adding book:", error);
                    throw error;
                }
            }

            export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
                try {
                    const response = await fetch(`https://localhost:5000/api/Book/Update/${bookId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(updatedBook),
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error updating book:", error);
                    throw error;
                }
            }

            export const deleteBook = async (bookId: number): Promise<void> => {
                try {
                    const response = await fetch(`https://localhost:5000/api/Book/Delete/${bookId}`, {
                        method: "DELETE",
                        credentials: "include",
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                } catch (error) {
                    console.error("Error deleting book:", error);
                    throw error;
                }
            }
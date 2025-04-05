import { useEffect, useState } from "react";
import NewBookForm from "../components/NewBookForm";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import { Book } from "../types/Book";
import EditBookForm from "../components/EditBookForm";

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [selectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

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
  }, [pageSize, pageNum, selectedCategories, isAscending]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
        await deleteBook(bookID);
        setBooks(books.filter((book) => book.bookID !== bookID));
    }
    catch (error) {
        console.error("Error deleting book:", error);
        setError("Failed to delete book. Please try again later.");
    }
  };

  if (loading) return <div>Loading Books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Admin - Books</h1>

      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, [], isAscending).then((data) => {
              setBooks(data.books);
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, pageNum, [], isAscending).then((data) => {
              setBooks(data.books);
              setTotalPages(Math.ceil(data.totalBooks / pageSize));
            });
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            {[
              "ID",
              "Title",
              "Author",
              "Publisher",
              "ISBN",
              "Classification",
              "Category",
              "Page Count",
              "Price",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((p) => (
            <tr key={p.bookID} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{p.bookID}</td>
              <td style={{ padding: "10px" }}>{p.title}</td>
              <td style={{ padding: "10px" }}>{p.author}</td>
              <td style={{ padding: "10px" }}>{p.publisher}</td>
              <td style={{ padding: "10px" }}>{p.isbn}</td>
              <td style={{ padding: "10px" }}>{p.classification}</td>
              <td style={{ padding: "10px" }}>{p.category}</td>
              <td style={{ padding: "10px" }}>{p.pageCount}</td>
              <td style={{ padding: "10px" }}>${p.price.toFixed(2)}</td>
              <td style={{ padding: "10px" }}>
                <button
                  className="btn btn-success"
                  style={{ marginRight: "5px" }}
                  onClick={() => setEditingBook(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
      />
    </>
  );
};

export default AdminPage;

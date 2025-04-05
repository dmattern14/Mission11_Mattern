import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form>
      <h2>Add New Book</h2>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        Publisher:
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
      </label>
      <label>
        ISBN:
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
      </label>
      <label>
        Classification:
        <input type="text" name="classification" value={formData.classification} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <label>
        Page Count:
        <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <br />
      <br />
      <button className="btn btn-success"type="submit" onClick={handleSubmit}>Add Book</button>
      <button className="btn btn-danger"type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewBookForm;

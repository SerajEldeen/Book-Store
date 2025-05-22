import axois from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function EditBook({ setBooks, setIsLoading, id, setIsEditing, currentBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setPublishYear(currentBook.publishYear);
    }
  }, [currentBook]);

  const handleUpdate = async (id) => {
    setIsLoading(true);
    try {
      const res = await axois.patch(`${import.meta.env.VITE_BASE_URL}/${id}`, {
        title,
        author,
        publishYear,
      });
      setBooks(res.data.books);
      setIsLoading(false);
      setIsEditing(false);
      toast.success("Book updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update the book.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Author</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-gray-600"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Publish year</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-gray-600"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => handleUpdate(id)}
            className="bg-[#242424] text-white px-4 py-2 rounded cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;

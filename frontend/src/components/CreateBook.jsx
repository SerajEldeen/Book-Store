import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
function CreateBook({ setIsCreated, setBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/`, {
        title,
        author,
        publishYear,
      });
      setBooks((prev) => [...prev, res.data.books]);
      setIsCreated(false);
      toast.success("Book created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create book.");
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
            onClick={() => handleCreate()}
            className="bg-[#242424] text-white px-4 py-2 rounded cursor-pointer"
          >
            Create
          </button>
          <button
            onClick={() => setIsCreated(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;

import { useEffect, useState } from "react";
import axios from "axios";
import EditBook from "./components/EditBook.jsx";
import CreateBook from "./components/CreateBook.jsx";
import { toast } from "react-toastify";
function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bookEditingID, setBookEditingId] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleGet();
  }, [page]);

  const handleGet = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/`, {
        params: { page, limit },
      });
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
      await handleGet();
      setIsLoading(false);
      toast.success("Book deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete book");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  if (isEditing) {
    return (
      <EditBook
        id={bookEditingID}
        setBooks={setBooks}
        setIsLoading={setIsLoading}
        setIsEditing={setIsEditing}
        currentBook={currentBook}
      />
    );
  }
  if (isCreated) {
    return <CreateBook setIsCreated={setIsCreated} setBooks={setBooks} />;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="uppercase text-center font-extrabold text-4xl mb-8">
        Welcome to the Book Store
      </h1>
      <div className="flex justify-end">
        <button
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:scale-105
          transition-transform cursor-pointer"
          onClick={() => setIsCreated(true)}
        >
          Add A Book
        </button>
      </div>
      {books.length === 0 ? (
        <div className="text-center pt-3 font-extrabold text-3xl">
          No books found
        </div>
      ) : (
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Publish Year</th>
              <th className="px-4 py-2">Operation</th>
            </tr>
          </thead>
          <tbody>
            {books.map((e, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{(page - 1) * limit + i + 1}</td>
                <td className="px-4 py-2">{e.title}</td>
                <td className="px-4 py-2">{e.author}</td>
                <td className="px-4 py-2">{e.publishYear}</td>
                <td className="px-4 py-2">
                  <button
                    className="cursor-pointer pr-2 hover:scale-x-110 transition-transform"
                    onClick={() => {
                      setIsEditing(true);
                      setBookEditingId(e._id);
                      setCurrentBook(e);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="cursor-pointer hover:scale-x-110 transition-transform"
                    onClick={() => {
                      handleDelete(e._id);
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center space-x-4 mt-5">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isLoading} // disable on loading
          className={`px-4 py-2 rounded ${
            page === 1 || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          } transition`}
        >
          Previous
        </button>

        <span className="self-center font-semibold">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || isLoading} // disable on loading
          className={`px-4 py-2 rounded ${
            page === totalPages || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          } transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/bookController.js";
const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").patch(updateBook).delete(deleteBook);

export default router;

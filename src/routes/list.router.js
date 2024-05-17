import express from "express";
import multer from "multer";
import { addUsersFromCSV, createList } from "../controllers/list.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", createList);
router.post("/:listId/users", upload.single("file"), addUsersFromCSV);

export default router;

import express from "express";
import multer from "multer";
import {
    addUsersFromCSV,
    createList,
    getAllLists,
} from "../controllers/list.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", createList);
router.post("/:listId/users", upload.single("UsersFile"), addUsersFromCSV);
router.get("/getall", getAllLists);

export default router;

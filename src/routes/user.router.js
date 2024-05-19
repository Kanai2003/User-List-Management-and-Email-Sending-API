import express from "express";
import {
    getAllUsers,
    sendEmailToList,
    unsubscribe,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/:listId/send-email", sendEmailToList);
router.post("/unsubscribe/:userId", unsubscribe);
router.get("/getall", getAllUsers);

export default router;

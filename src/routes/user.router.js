import express from "express";
import { sendEmail, unsubscribe } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/:listId/send-email", sendEmail);
router.post("/unsubscribe/:userId", unsubscribe);

export default router;

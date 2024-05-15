import express from "express";
import { createPackage, trackPackage } from "../controllers/packageController";
import { authenticateJWT } from "../middlewares/auth";

const router = express.Router();

router.post("/package", authenticateJWT, createPackage);
router.get("/package/:id", authenticateJWT, trackPackage);

export default router;

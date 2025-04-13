import express from "express";
import { vendorSignup, vendorLogin, vendorLogout , checkauth } from "../controllers/vendorAuth.controller.js";
import { protectroute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", vendorSignup);
router.post("/login", vendorLogin);
router.post("/logout", vendorLogout);
router.get("/check", protectroute, checkauth);

export default router;

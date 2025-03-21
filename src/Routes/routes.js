import { Router } from "express";
import authRouter from "./auth.js";
import passport from "passport";

const router = Router();

// Authentication Middleware
router.use((req, res, next) => {
    const excludedRoutes = ["/login", "/register"];
    if (excludedRoutes.includes(req.path)) {
        return next();
    }
    return passport.authenticate("jwt", { session: false })(req, res, next);
});


// Routes
router.use('/', authRouter);

export default router;
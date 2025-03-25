import { Router } from "express";
import authRouter from "./auth.js";
import passport from "passport";
import "../Auth/jwtStrategy.js"
import projectRouter from "./project.js";

const router = Router();

// Authentication Middleware
router.use((req, res, next) => {
    const excludedRoutes = ["/auth"];
    if (excludedRoutes.includes(req.path)) {
        return next();
    }
    return passport.authenticate("jwt", { session: false })(req, res, next);
});


// Routes
router.use('/auth', authRouter);
router.use('/api' , projectRouter)

export default router;
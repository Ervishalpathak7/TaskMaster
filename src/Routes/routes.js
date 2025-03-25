import { Router } from "express";
import authRouter from "./auth.js";
import passport from "passport";
import "../Auth/jwtStrategy.js"
import projectRouter from "./project.js";
import userRouter from "./user.js";

const router = Router();

// Authentication Middleware
router.use((req, res, next) => {
    const excludedRoutes = ["/auth"];
    if (req.path.includes(excludedRoutes)) return next();
    passport.authenticate("jwt", { session: false })(req, res, next);
});


// Routes
router.use('/auth', authRouter);
router.use('/api/projects' , projectRouter)
router.use('/api/users', userRouter)

export default router;
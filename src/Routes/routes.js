import { Router } from "express";
import authRouter from "./auth.js";
import projectRouter from "./project.js";
import userRouter from "./user.js";
import passport from "../Auth/jwtStrategy.js"

const router = Router();

// Authentication Middleware
router.use((req, res, next) => {
    const excludedRoutes = ["/auth"];
    if (req.path.includes(excludedRoutes)) return next();
    passport.authenticate("jwt", { session: false })(req, res, next);
});


// Routes
router.use('/auth', authRouter);
router.use('/api/projects' , [projectRouter])
router.use('/api/users', userRouter)

export default router;
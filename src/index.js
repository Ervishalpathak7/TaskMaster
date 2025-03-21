import express, { urlencoded } from "express";
import authRouter from "./Routes/AuthRoutes.js";
import passport from "passport";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import "./Auth/jwtStrategy.js"
configDotenv();

// App instance
const app = express();

// Port
const port = process.env.PORT;

// Middlewares
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(passport.initialize());


app.use('/', authRouter);
app.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req);
    res.json({ message: "You have access!", user: req.user });
});


app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
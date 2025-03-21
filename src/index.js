import express, { urlencoded } from "express";
import authRouter from "./Routes/AuthRoutes.js";
import passport from "passport";
import bodyParser from "body-parser";

// App instance
const app = express();

// Port
const port = 3000;

// Middlewares
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(passport.initialize());


app.use('/', authRouter);


app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
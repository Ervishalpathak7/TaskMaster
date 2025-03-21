import express, { urlencoded } from "express";
import passport from "passport";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import router from "./Routes/routes.js";
configDotenv();

// App instance
const app = express();

// Port
const port = process.env.PORT;

// Middlewares
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/', router);


app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
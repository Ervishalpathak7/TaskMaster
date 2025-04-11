import express, { urlencoded } from "express";
import passport from "passport";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import router from "./Routes/routes.js";
import connectDB from "./database/connection.js";
configDotenv();

// App instance
const app = express();

// Database connection

// Port
const port = process.env.PORT || 5000;

// Middlewares
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/', router);


connectDB()
    .then(() => { 
            app.listen(port, () => console.log(`Server is running on port ${port}`))
        })
    .catch(error => console.error("Error connecting to the database:", error));
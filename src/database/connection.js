import mongoose from "mongoose";

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;

// This code connects to a MongoDB database using Mongoose.
// It exports a function called connectDB that attempts to establish a connection.
// If the connection is successful, it logs "MongoDB connected" to the console.
// If there is an error, it logs the error and exits the process with a failure code (1).
// The connection URI is taken from the environment variable MONGODB_URI.
import mongoose, { Schema , model } from "mongoose";

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50
    },
    description : {
        type : String,
        required : true,
        minLength : 10,
        maxLength : 500
    },
    status : {
        type : String,
        enum : ["Pending", "In Progress", "Completed"],
        default : "Pending"
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, { timestamps: true });


const Task = model("Task", taskSchema);
export default Task;
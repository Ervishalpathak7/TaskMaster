import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"],
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        select : false
    },
    projects : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Tasks"
    },
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;


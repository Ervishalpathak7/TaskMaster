import User from "../models/userSchema.js";

const createUser = async (name , email , password) => {
    try {

        // Check if all fields are provided
        if(!name || !email , !password) throw new Error("Please provide all fields");

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password
        });

        newUser.password = undefined;

        // Return new user
        return newUser;
        
    } catch (error){
        console.log(`Error creating user: ${error.message}`); 
        throw new Error(error.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        // Check if email is provided
        if(!email) throw new Error("Please provide an email");

        // Get user by email
        const user = await User.findOne({ email }).select("+password");
        
        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }

        // Return user
        return user;
        
    } catch (error){
        console.log(`Error getting user: ${error.message}`); 
        throw new Error(error.message);
    }
}

const getUserById = async (id) => {
    try {
        // Check if id is provided
        if(!id) throw new Error("Please provide an id");

        // Get user by id
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }

        // Return user
        return user;
        
    } catch (error){
        console.log(`Error getting user: ${error.message}`); 
        throw new Error(error.message);
    }
}
    
const updateUser = async (id, updates) => {
    try {
        // Check if id is provided
        if(!id) throw new Error("Please provide an id");

        // Check if updates are provided
        if(!updates) throw new Error("Please provide updates");

        // Check if updates are valid
        const validUpdates = ["name", "email"];
        const isValidUpdate = Object.keys(updates).every((update) => validUpdates.includes(update));
        if (!isValidUpdate) throw new Error("Invalid updates");
        
        // Check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Check if email is being updated
        if(updates.email && updates.email !== existingUser.email){
            const getUserByEmail = User.findOne({ email: updates.email });
            if (getUserByEmail) {
                throw new Error("Email already exists");
            }
        }
        
        // Update user
        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        // Return user
        return user;
        
    } catch (error){
        console.log(`Error updating user: ${error.message}`); 
        throw new Error(error.message);
    }
}

const deleteUser = async (id) => {
    try {
        // Check if id is provided
        if(!id) throw new Error("Please provide an id");

        // Delete user
        const user = await User.findByIdAndDelete(id);

        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }

        // Return user
        return user;
        
    } catch (error){
        console.log(`Error deleting user: ${error.message}`); 
        throw new Error(error.message);
    }
}

const userRepo = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser
}

// Exporting the userRepo object
export default userRepo;
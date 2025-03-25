import passport from "passport";
import { Strategy as LocalStratergy } from "passport-local";
import { findUserByEmail } from "../repositories/userRepo.js";
import { comparePassword } from "../services/bcrypt.js";

export default passport.use(
  new LocalStratergy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        let finduser = await findUserByEmail(email);
        if (!finduser) throw new Error("No User Found");
        const isPasswordValid = await comparePassword(password , finduser.password);
        if (!isPasswordValid) throw new Error("Invalid Credentials");
        done(null, { id: finduser.id, username: finduser.username });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

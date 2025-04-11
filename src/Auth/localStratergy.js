import passport from "passport";
import { Strategy as LocalStratergy } from "passport-local";
import userRepo from "../repo/userRepo.js";

export default passport.use(
  new LocalStratergy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const finduser = await userRepo.getUserByEmail(email);
        if (!finduser) throw new Error("No User Found");
        if (!finduser.comparePassword(password , finduser.password)) throw new Error("Invalid Credentials");
        done(null, { id: finduser.id, email: finduser.email });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

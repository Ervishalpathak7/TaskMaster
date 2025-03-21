import passport from "passport";
import { Strategy } from "passport-local";
import { findUserByEmail } from "./database.js";
import { comparePassword } from "./bcrypt.js";


export default passport.use(
  new Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        let finduser = await findUserByEmail(email);
        if (!finduser) throw new Error("Invalid Username");
        if (!comparePassword(password , finduser.password)) throw new Error("Invalid Credentials");
        done(null, finduser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

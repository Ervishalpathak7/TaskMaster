import passport from "passport";
import { Strategy } from "passport-local";
import { findUserByEmail } from "./database.js";


export default  passport.use(
  new Strategy(async (email, password, done) => {
    try {
      let finduser = await findUserByEmail(email);
      if (!finduser) throw new Error("Invalid Username");
      if (finduser.password !== password) throw new Error("Invalid Credentials");
      done(null, finduser);
    } catch (error) {
      done(error.message, null);
    }
  })
);

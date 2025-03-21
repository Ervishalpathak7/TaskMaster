import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../mocks/users.js";


export default passport.use(
  new Strategy((username, password, done) => {
    try {
      let finduser = users.find((user) => user.username === username);
      if (!finduser) throw new Error("Invalid Username");
      if (finduser.password !== password) throw new Error("Invalid Credentials");
      done(null, finduser);
    } catch (error) {
      done(error.message, null);
    }
  })
);

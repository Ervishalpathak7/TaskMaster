import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userRepo from "../repo/userRepo.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.issuer,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        if (jwt_payload) {
            const user = await userRepo.getUserById(jwt_payload.id);
            if (!user) return done(null, false);
            return done(null, { id: user.id, username: user.username });
        } else {
            return done(null, false);
        }
    })
);

export default passport;

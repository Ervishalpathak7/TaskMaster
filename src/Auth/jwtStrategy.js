import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: "TaskMaster.com",
    audience: "TaskMaster.net",
};

export default passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload) {
            return done(null, { id: jwt_payload.id, email: jwt_payload.email, role: jwt_payload.role });
        } else {
            return done(null, false);
        }
    })
);

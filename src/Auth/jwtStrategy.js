import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.issuer,
};

export default passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload) {
            return done(null, { id: jwt_payload.id, username: jwt_payload.username });
        } else {
            return done(null, false);
        }
    })
);

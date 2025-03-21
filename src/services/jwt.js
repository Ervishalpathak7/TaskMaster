import jwt from "jsonwebtoken"

const privateKey = process.env.JWT_SECRET;
const issuer = process.env.ISSUER;
const audience =  process.env.AUDIENCE;


export function GenerateJwtToken(User) {
    return jwt.sign(
        { id : User.id ,email: User.email, role: User.role },
        privateKey,
        {
            expiresIn: "1h",
            issuer: issuer,
            audience: audience,
        }
    );
}


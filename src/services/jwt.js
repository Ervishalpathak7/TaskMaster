import jwt from "jsonwebtoken"

const privateKey = process.env.JWT_SECRET;
const issuer = process.env.issuer;
const audience =  process.env.audience;


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

export function VerifyJwtToken(token) {
    return jwt.verify(token, privateKey, { issuer: issuer, audience: audience });
}
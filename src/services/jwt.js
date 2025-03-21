import jwt from "jsonwebtoken"

const privateKey = process.env.JWT_SECRET;

export function GenerateJwtToken(User) {
    return new Promise((resolve, reject) => {
        jwt.sign({ username: User.username }, privateKey, { algorithm: 'HS256' }, function (err, token) {
            if (err) {
                console.error("Error generating JWT token:", err);
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}

export function VerifyJwtToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, function(err, decoded) {
            if (err) {
                console.error("Error verifying JWT token:", err);
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
}
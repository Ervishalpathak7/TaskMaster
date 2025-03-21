import jwt from "jsonwebtoken"
import crypto from "crypto";


const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
});

export function GenerateJwtToken(User) {
    return new Promise((resolve, reject) => {
        jwt.sign({ username: User.username }, privateKey, { algorithm: 'RS256' }, function (err, token) {
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
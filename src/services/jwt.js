import jwt from "jsonwebtoken"
import { findUserByID } from "../repositories/userRepo.js";
import { saveRefreshToken } from "../repositories/refreshTokenRepo.js";

const privateKey = process.env.JWT_SECRET;
const issuer = process.env.ISSUER;


export function generateAccessToken(userId){
    return jwt.sign(
        { id : userId},
        privateKey, 
        { expiresIn: "1h", issuer : issuer }
     )
}

export function generateRefreshToken(userId){
    return jwt.sign(
        { id : userId },
        privateKey, 
        { expiresIn: "30d", issuer : issuer }
     )
}

export async function generateAccessAndRefreshTokens(userId) {
  try {
    const user = await findUserByID(userId);

    if(!user) throw new Error("user not found with given id")
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await  saveRefreshToken(refreshToken , userId);
    return { accessToken, refreshToken };

  } catch (error) {
    console.error("Something went wrong while generating the access token");
    throw error;
  }
};


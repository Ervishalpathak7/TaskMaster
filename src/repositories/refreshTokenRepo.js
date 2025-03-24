import prismaClient from "../prisma/client.js";

export async function saveRefreshToken(token , userId) {
    try {
        await prismaClient.refreshTokens.create({
            data : {
                token : token,
                userId : userId
            }
        })
    } catch (error) {
        console.error("error while saving refresh token" , error);
        throw error
    }
    
}
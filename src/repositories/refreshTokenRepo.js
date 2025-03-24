import prismaClient from "../prisma/client.js";

export async function saveRefreshToken(token , userId) {
    try {

        const existingToken = await prismaClient.refreshTokens.findFirst({
            where : {
                userId : userId
            }
        })

        if(existingToken) {
            await prismaClient.refreshTokens.update({
                where : {
                    userId : userId
                },
                data : {
                    token : token
                }
            })
        } else {
            await prismaClient.refreshTokens.create({
                data : {
                    token : token,
                    userId : userId
                }
            })
        }

    } catch (error) {
        console.error("error while saving refresh token" , error);
        throw error
    }
    
}
import prismaClient from "../prisma/client.js";

export async function saveRefreshToken(token , userId) {
    try {

        const existingToken = await prismaClient.refreshToken.findFirst({
            where : {
                userId : userId
            }
        })

        if(existingToken) {
            await prismaClient.refreshToken.update({
                where : {
                    userId : userId
                },
                data : {
                    token : token
                }
            })
        } else {
            await prismaClient.refreshToken.create({
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

// Delete refresh token
export async function deleteRefreshToken(token){
    try {

        const existingToken = await prismaClient.refreshToken.findFirst({
            where : {
                token : token
            }
        });

        if(!existingToken) throw new Error("Invalid Token");
        await prismaClient.refreshToken.delete({
            where : {
                token : token
            }
        })
    } catch (error) {
        console.error("error while deleting refresh token" , error);
        throw error
    }
}
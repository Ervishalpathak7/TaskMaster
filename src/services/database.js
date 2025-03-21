import prismaClient from "../prisma/client.js";


export async function findUsers() {
    return await prismaClient.user.findMany();
}

export async function findUserByEmail(email) {
    return await prismaClient.user.findUnique({
        where: {
            email: email
        }
    });
}

export async function saveUser(name, email, password) {
    return await prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
}
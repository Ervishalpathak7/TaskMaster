import e from "express";
import prismaClient from "../prisma/client.js";

export async function findUserByEmail(email) {
    try {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (error){
        console.error("error finding user", error);
        throw error;
    }
}

export async function findUserByID(userId){
    try {
        return await prismaClient.user.findUnique({
            where : {
                id : userId
            }
        })
    } catch (error) {
        console.error("error while finding user by id " , error)
        throw error;
    }
}

export async function findUserByUsername(username){
    try {
        return await prismaClient.user.findUnique({
            where : {
                username : username
            }
        });
    } catch (error) {
        console.error("Error finding user by username:", error);
        throw error;
    }
}

export async function saveUser(name, email, username, password) {
    try {
        return await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                username : username,
                password: password,
            }
        });
    } catch (error) {
        console.error("error saving user " , error)
        throw error;
    }
}

export async function updateUser(username, data) {
    try {
        return await prismaClient.user.update({
            where: {
                username: username
            },
            data: data
        });
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}

export async function deleteUser(username) {
    try {
        return await prismaClient.user.delete({
            where: {
                username: username
            }
        });
    } catch (error) {
        console.error("Error deleting user", error);
        throw error;
    }
}
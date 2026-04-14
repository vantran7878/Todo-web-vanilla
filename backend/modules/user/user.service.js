import * as userModel from "./user.model.js"

// GET all users


//USER should delete sensitive info
export const getUsers = async() => {
    return userModel.findAllUser();
};


export const getUsersByID = async(id) => {
    const user = await userModel.findUserByID(id);

    if (!user) {
        throw new Error("User not found");
    }

    const {password, ...censored_user} = user;
    return censored_user;
}

// ADD user
export const createUser = async (data) => {
    if (!data.email) {
        throw new Error("Email is required");
        
    }

    const existingUser = userModel.findUserByEmail(data.email);

    if (existingUser) {
        throw new Error("Email already in use");
        
    }

    // thêm kiểm tra trùng email
    const newUser = await userModel.createUser(data);

    return newUser;
}

export const updateUser = async (id, data) => {
    const updated_user = await userModel.updateUser(id, data);

    if (!updated_user) {
        throw new Error("User not found");
    }

    return updated_user;
}

export const deleteUser = async (id) => {
    const deleted_user = await userModel.deleteUser(id);

    if (!deleted_user) {
        throw new Error("Delete user fail");
    }
    
    return deleted_user;
}


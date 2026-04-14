import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as userModel from "../user/user.model.js"

export const register = async ({ email, password, displayName}) => {
   const existingUser = await userModel.findUserByEmail(email);

   if (existingUser) {
    throw new Error ("Email already exists");
   }

   const hashedPass = await bcrypt.hash(password, 10);

   return userModel.createUser({
    email,
    password: hashedPass,
    displayName
   })
}

export const login = async ({email, password }) => {
    const user = await userModel.findUserByEmail(email);

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid Password");

    const token = jwt.sign(
        {id: user.id},
        "SECRET_KEY",
        {expiresIn: "1h"}
    )

    return {token};
}
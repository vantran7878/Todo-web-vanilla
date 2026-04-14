
//link to service
//import { UserService } from 'UserService.js';

import * as userService from "./user.service.js";
// a controller class
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const user = await userService.getUsersByID(req.params.id)
    res.status(200).json({ success: true, data: user});
  } catch (error) {
    res.status(404).json({ success: false, message: "Internal server error: " + error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);
    const newUser = await userService.createUser(req.body);    
    res.status(200).json({ success: true, data: newUser});
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body);  
    res.status(200).json({ success: true, data: updatedUser});
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id)
    res.status(200).json({ success: true, data: deletedUser});
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }

}
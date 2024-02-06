"use server";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { connectToDB } from "../database";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    handleError(err);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDB();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error(`User ${clerkId} not found`);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (clerkId: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error(`User ${clerkId} not found`);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDB();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error(`User ${clerkId} not found`);
    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      Order.updateMany(
        { _id: { $in: userToDelete.Orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);
    const deleteUser = await User.findOneAndDelete(userToDelete._id);
    return JSON.parse(JSON.stringify(deleteUser));
  } catch (error) {
    handleError(error);
  }
};

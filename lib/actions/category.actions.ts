"use server";
import { CreateCategoryParams } from "@/types";
import { connectToDB } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async ({
  categoryName
}: CreateCategoryParams) => {
  try {
    await connectToDB();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const getAllCategory = async () => {
  try {
    await connectToDB();
    const categories = await Category.find();
    if (!categories) throw new Error(`Categories not found`);
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

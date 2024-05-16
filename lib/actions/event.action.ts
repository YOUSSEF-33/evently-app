
"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName ",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDB();
    const organizer = await User.findById(userId);
    const newEvent = await Event.create({
      ...event,
      organizer: organizer,
      category: event.categoryId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (id: string) => {
  try {
    await connectToDB();
    const event = await populateEvent(Event.findById(id));
    if (!event) throw new Error("no event");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDB();
    const titleCondition = query ? { $regex: query, $options: "i" } : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const getEvents = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(getEvents);
    const eventsCount = await Event.countDocuments(conditions);
    if (!events) throw new Error("no event");
    return {
      data: JSON.parse(JSON.stringify(events)),
      numberOfPages: eventsCount,
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDB();
    const EventToUpdate = await populateEvent(Event.findById(event._id));
    if (!EventToUpdate || EventToUpdate.organizer.toString() !== userId) {
      throw new Error("no event or error on authorization");
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    console.log(error)
  }
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDB();
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedEventsBycategory = async ({
  eventId,
  categoryId,
  limit = 3,
  page,
}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDB();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };
    const getEvents = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const events = await populateEvent(getEvents);
    const eventsCount = await Event.countDocuments(conditions);
    return {
      data:JSON.parse(JSON.stringify(events)),
      count: eventsCount,
    }
  } catch (err) {
    handleError(err);
  }
};


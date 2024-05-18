import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: {_id: string, name: string};
  organizer: {_id: string, firstName: string, lastName: string};
}

const eventSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    description: {
      require: true,
      type: String,
    },
    location: {
      require: true,
      type: String,
    },
    imageUrl: {
      require: true,
      type: String,
    },
    startDateTime: {
      default: Date.now(),
      type: Date,
    },
    endDateTime: {
      default: Date.now(),
      type: Date,
    },
    price: {
      require: true,
      type: Number,
    },
    isFree: {
      require: true,
      type: Boolean,
    },
    url: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

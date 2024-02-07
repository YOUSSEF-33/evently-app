import mongoose from "mongoose";

const cached = (global as any).mongoose || { conn: null, promise: null };
const mongoUrl = process.env.MONGODB_URL;

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;
  if(!mongoUrl) throw new Error("faild to connect");
  cached.promise = cached.promise || mongoose.connect(mongoUrl);
  cached.conn = await cached.promise;
  return cached.conn;
};

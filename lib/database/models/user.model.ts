import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    require: true,
    unique: true,
    type: String,
    min: 6,
    max: 16,
  },
  email: {
    require: true,
    unique: true,
    type: String,
  },
  firstName: {
    require: true,
    type: String,
  },
  lastName: {
    type: String,
  },
  clerkId: {
    unique: true,
    type: String,
  },
  photo: {
    require: true,
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

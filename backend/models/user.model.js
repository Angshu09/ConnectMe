import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ""
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    About: {
        type: String,
        default: ""
    },
    image: {
      type: String,
      default: ""
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

export default User;

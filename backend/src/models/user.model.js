import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    camps: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Camp" }],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
});

userSchema.methods.verifyPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

const User = mongoose.model("User", userSchema);
export default User;

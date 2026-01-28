import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    campId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camp",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        id: String,
        url: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

postSchema.index({ campId: 1, userId: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;

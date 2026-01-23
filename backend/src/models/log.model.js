import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    campId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camp",
      required: true,
    },
    log: {
      type: String,
      enum: ["User", "Post", "Message"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { timestamps: true },
);

logSchema.index({ campId: 1, log: 1, createdAt: -1 });

const Log = mongoose.model("Log", logSchema);

export default Log;

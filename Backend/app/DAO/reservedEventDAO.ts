import mongoose from "mongoose";

const ReservedEventSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poster",
    required: true,
  },
  posterEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posterEvent",
    required: true,
  },
  reserved: { type: Boolean, default: true },
});

import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  techStack: String,
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);

export default Project;

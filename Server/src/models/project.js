import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
  title: { type: String },
  description: { type: String },
  url: { type: String },
  techStack: [String],
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);

export default Project;

import mongoose from "mongoose";
import moduleSchema from "../modules/schema.js";

const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   due: String,
   availFrom: String,
   availUntil: String,
   description: String,
   pts: Number
 },
 { collection: "assignments" }
);
export default assignmentSchema;
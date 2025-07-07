import mongoose from "mongoose";

// user details and role 
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "organizer"], default: "user" },
});

export default mongoose.model("User", userSchema);

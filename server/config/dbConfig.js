import mongoose from "mongoose";
export const dbConnect = () => mongoose.connect(process.env.MONGO_URI);

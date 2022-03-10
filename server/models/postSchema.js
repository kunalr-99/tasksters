import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    maxLength: 100,
  },
  difficutyLevel: {
    type: Number,
  },
  category: {
    type: String,
    default: "general",
  },
});

const PostModel = mongoose.model("post", PostSchema);

export default PostModel;

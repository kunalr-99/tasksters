import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Please enter title for this post`],
  },
  imgUrl: {
    type: String,
    required: [true, `Please enter url for this post`],
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

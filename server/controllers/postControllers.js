import PostModel from "../models/postSchema.js";
import { AsyncErrors } from "../middlewares/AsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

// Create a Post - C
export const createPost = AsyncErrors(async (req, res, next) => {
  const { imgUrl } = req.body;
  const dupImg = await PostModel.findOne({ imgUrl });

  if (!dupImg) {
    const newPost = await PostModel.create(req.body);
    return res
      .status(201)
      .json({ message: `Your new Post is Created`, newPost });
  }
  return next(new ErrorHandler(302, `This Post Already exists`));
});

// Read a Posts - R
export const getPosts = AsyncErrors(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(PostModel.find(), req.query)
    .search()
    .filter();
  const allPosts = await apiFeatures.query;
  if (allPosts.length !== 0)
    // return next(new ErrorHandler(201, `Here are all your posts`));
    return res
      .status(201)
      .json({ message: `Here are all your posts`, allPosts });
  return next(new ErrorHandler(302, `You have no posts to display`));
});

export const getSpecificPostByTitle = AsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const specificPost = await PostModel.findOne({ title });
  if (specificPost)
    return res.status(201).json({
      message: `Here is your post with title: ${title}`,
      specificPost,
    });
  return next(new ErrorHandler(302, `You have no post with title: ${title}`));
});

export const getSpecificPostByCategory = AsyncErrors(async (req, res, next) => {
  const { category } = req.params;
  const specificPost = await PostModel.findOne({ category });
  if (specificPost)
    return res.status(201).json({
      message: `Here is your post with category: ${category}`,
      specificPost,
    });
  return next(
    new ErrorHandler(302, `You have no post with category: ${category}`)
  );
});

// Update or Edit a Post - U
export const updateSpecificPostByTitle = AsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const specificPost = await PostModel.findOne({ title });
  if (specificPost) {
    const updatedPost = {
      ...specificPost._doc,
      ...req.body,
    };
    await PostModel.findOneAndReplace({ title }, updatedPost);
    return res.status(201).json({
      message: `Here is your updated post with title: ${title}`,
      updatedPost,
    });
  }
  return next(new ErrorHandler(302, `You have no post with title: ${title}`));
});

// Delete a Post - D
export const deleteSpecificPostByTitle = AsyncErrors(async (req, res, next) => {
  const { title } = req.params;
  const specificPost = await PostModel.findOneAndDelete({ title });
  if (specificPost)
    return res.status(201).json({
      message: `Successfully deleted your post with title: ${title}`,
      specificPost,
    });
  return next(new ErrorHandler(302, `No post found with the title: ${title}`));
});

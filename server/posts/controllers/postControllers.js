import PostModel from "../../database/postSchema.js";

// Create a Post - C
export const createPost = async (req, res) => {
  try {
    const { imgUrl } = req.body;
    const dupImg = await PostModel.findOne({ imgUrl });

    if (!dupImg) {
      const newPost = await PostModel.create(req.body);
      return res
        .status(201)
        .json({ message: `Your new Post is Created`, newPost });
    }
    return res.status(302).json({
      message: `This Post Already exists`,
    });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

// Read a Posts - R
export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    if (allPosts.length !== 0)
      return res
        .status(201)
        .json({ message: `Here are all your posts`, allPosts });
    return res.status(302).json({ message: `You have no posts to display` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

export const getSpecificPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const specificPost = await PostModel.findOne({ title });
    if (specificPost)
      return res.status(201).json({
        message: `Here is your post with title: ${title}`,
        specificPost,
      });
    return res
      .status(302)
      .json({ message: `You have no post with title: ${title}` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

export const getSpecificPostByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const specificPost = await PostModel.findOne({ category });
    if (specificPost)
      return res.status(201).json({
        message: `Here is your post with category: ${category}`,
        specificPost,
      });
    return res
      .status(302)
      .json({ message: `You have no post with category: ${category}` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

// Update a Post - U
export const updateSpecificPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const specificPost = await PostModel.findOne({ title });
    if (specificPost) {
      const updatedPost = req.body;
      await PostModel.findOneAndReplace({ title }, updatedPost);
      return res.status(201).json({
        message: `Here is your updated post with title: ${title}`,
        updatedPost,
      });
    }
    return res
      .status(302)
      .json({ message: `You have no post with title: ${title}` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

// Delete a Post - D
export const deleteSpecificPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const specificPost = await PostModel.findOneAndDelete({ title });
    if (specificPost)
      return res
        .status(201)
        .json({
          message: `Successfully deleted your post with title: ${title}`,
          specificPost,
        });
    return res.json({ message: `No post found with the title: ${title}` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

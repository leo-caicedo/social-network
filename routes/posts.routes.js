const router = require("express").Router();

// models
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/timeline", async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: user._id });
    const followings = user.followings;
    let followingsPost = await Post.find({
      userId: followings.map((post) => post),
    });
    res.json(followingsPost.concat(userPost));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { body: newPost } = req;

  try {
    const postCreaded = new Post(newPost);
    await postCreaded.save();
    res.status(201).json(postCreaded);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body: postData } = req;

  try {
    const post = await Post.findById(id);
    if (post.userId === req.body.userId) {
      const postUpdated = await Post.findByIdAndUpdate(id, postData, {
        new: true,
      });
      res.json(postUpdated);
    } else {
      return res
        .status(403)
        .json({ message: "You can update only your posts" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(id);
      res.status(204).end();
    } else {
      return res
        .status(403)
        .json({ message: "You can delete only your posts" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id/like", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.json({ message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.json({ message: "The post has been disliked" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

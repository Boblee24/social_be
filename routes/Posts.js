const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/Authmiddleware');

const { Posts, PostLikes, sequelize } = require('../models');

// 📌 GET all posts with their like counts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        { model: PostLikes } // 👈 include all likes directly
      ],
    });

    res.json(posts);
  } catch (error) {
    console.error("❌ MySQL Error:", error);
    res.status(500).json({ error: error.message });
  }
});



router.get('/byId/:id', async (req, res) => {
  const id = req.params.id
  const post = await Posts.findByPk(id);
  res.json(post);
})
router.post('/', validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  post.username = username
  await Posts.create(post)
  res.json(post)
})

module.exports = router;
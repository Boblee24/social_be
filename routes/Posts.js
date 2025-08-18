const express = require('express');
const router = express.Router();
const { Posts, PostLikes, sequelize } = require('../models');

// 📌 GET all posts with their like counts
router.get('/', async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({
      // 👉 Attributes to fetch from Posts
      attributes: {
        include: [
          // Add a computed column "likeCount"
          // COUNT(PostLikes.id) will count how many likes each post has
          [sequelize.fn("COUNT", sequelize.col("PostLikes.id")), "likeCount"]
        ]
      },
      // 👉 Include the PostLikes model
      include: [
        {
          model: PostLikes,
          attributes: [] // ⚡ Don't fetch full like objects, just use them for counting
        }
      ],
      // 👉 Group by Posts.id so each post is unique,
      //    otherwise COUNT() would return a single big total
      group: ["Posts.id"]
    });

    // ✅ Send posts + likeCount as JSON
    res.json(listOfPosts);

  } catch (error) {
    // ❌ Handle DB errors
    console.error("MySQL Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
})
router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post)
    res.json(post)
})

module.exports = router;
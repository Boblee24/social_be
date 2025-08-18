const express = require('express');
const router = express.Router();
const { PostLikes } = require('../models');
const { validateToken } = require('../middlewares/Authmiddleware');
const { where } = require('sequelize');

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const likes = await PostLikes.findAll({ where: { PostId: postId } });
    res.json(likes);
})
router.post('/', validateToken, async (req, res) => {
  try {
    const { PostId } = req.body; // ✅ post to like/unlike
    const username = req.user.username;

    // Check if this user already liked the post
    const existingLike = await PostLikes.findOne({
      where: { PostId, username }
    });

    if (existingLike) {
      // ✅ Unlike (delete the like)
      await PostLikes.destroy({
        where: { PostId, username }
      });
      return res.json({ message: "Unliked successfully" });
    } else {
      // ✅ Like (create a new like)
      const newLike = await PostLikes.create({ PostId, username, liked: true });
      return res.json(newLike);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
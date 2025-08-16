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
        const liked = req.body;
        const username = req.user.username;
        liked.username = username
        const newLike = await PostLikes.create(liked);
        res.json(newLike);
    } catch (error) {
        res.status(500).json({ error: error.message }); // ✅ Send error status
    }
})
router.delete('/', validateToken, async (req, res) => {
    const username = req.user.username;
    PostLikes.destroy({
        where: {
            username: username
        }
    })
    res.json("Succesfully deleted");
})

module.exports = router;
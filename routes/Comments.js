const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/Authmiddleware');

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const post = await Comments.findAll({where: {postId: postId}}) ;
    res.json(post);
})
router.post('/', validateToken, async (req, res) => {
    try {
        const comment = req.body;
        const username = req.user.username;
        comment.username = username
        const newComment = await Comments.create(comment);
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message }); // ✅ Send error status
    }
})

module.exports = router;
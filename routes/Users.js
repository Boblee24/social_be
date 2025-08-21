const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/Authmiddleware');
const Posts = require('../models/Posts');

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hello) => {
        Users.create({
            username: username,
            password: hello,
        });
        res.json("You too sabi");
    })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
 
    if (!user) {
        return res.status(404).json({ error: "User doesn't exist" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: "Wrong password" });
    } 

    const accessToken = sign({ username: user.username, id: user.id }, "process.env.JWT_SECRET");

    res.json({ accessToken, success: "User logged in", username: username, id: user.id });
});
router.get("/auth", validateToken, async (req, res) => {
    res.json(req.user);
})
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await Users.findByPk(id)
    res.json(user)
})
router.get("/:id/posts", async (req, res) => {
    const id = req.params.id
    const posts = await Posts.findAll({ where: { userId: id } })
    res.json(posts)
})

module.exports = router;
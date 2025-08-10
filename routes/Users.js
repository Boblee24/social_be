const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

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

    res.json({ message: "You logged in successfully" });
});

module.exports = router;
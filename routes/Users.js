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
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } })
    if (!user) res.json({ error: "User doesn't exist ejeh me" })
    bcrypt.compare(password, user.password).then((result) => {
        if (!result) res.json({ error: "Wrong password" })
   
        res.json("You logged in successfully")
    })
})

module.exports = router;
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
const db = require("./models")
const postsRouter = require('./routes/Posts')
app.use('/posts', postsRouter);

const CommentsRouter = require('./routes/Comments')
app.use('/comments', CommentsRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001, Type shit, Loveluve");
    })
})

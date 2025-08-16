const { types } = require("@vercel/postgres");

module.exports = (sequelize, DataTypes) => {
    const PostLikes = sequelize.define("PostLikes", {
        liked: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return PostLikes;
} 
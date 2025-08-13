const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const accessToken = req.header("accesstoken");

    if (!accessToken) return res.json({ error: "User not authenticated" });

    try {
    const validToken = verify(accessToken, "process.env.JWT_SECRET");
    if (validToken) {
        return next(); // ✅ Add return to prevent further execution
    }
} catch (err) {
    return res.status(401).json({ error: err.message }); // ✅ Send 401 with error
}
}
module.exports = { validateToken }  
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  // If there's no token, return early to avoid continuing to the next block
  if (!token) {
    return res.status(400).json({ error: "Authorization token required" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Return early to avoid sending multiple responses
    return res.status(400).json({ error: "Request is not authorized heheh" });
  }
};

module.exports = requireAuth;

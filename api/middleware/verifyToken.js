const jwt = require("jsonwebtoken");
const createError  = require("../utils/error");

// verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.access_token;
    if(!authHeader) {
        createError(401, "Access token is required")
    } 

    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// verify user
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// verify admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
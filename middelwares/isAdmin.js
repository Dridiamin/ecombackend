exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(401).json({message:"For admin only"})
    next();
}
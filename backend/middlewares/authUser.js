import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = (req, res, next) => {
    try {

        const userToken = req.headers['usertoken'];
        if (!userToken) {
            return  res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        const tokenDecode = jwt.verify(userToken, process.env.JWT_SECRET);
        req.user = tokenDecode;
        next();

    } catch (error) {
        console.log("Error in user authentication middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export default authUser;
import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = (req, res, next) => {
    try {

        const adminToken = req.headers['admin-token'];
        if (!adminToken) {
            return  res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);
        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }
        next();

    } catch (error) {
        console.log("Error in admin authentication middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export default authAdmin;
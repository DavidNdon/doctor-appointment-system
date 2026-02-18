import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoctor = (req, res, next) => {
    try {

        const doctorToken = req.headers['doctor-token'] || req.headers['authorization'];
        if (!doctorToken) {
            return  res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        const tokenDecode = jwt.verify(doctorToken, process.env.JWT_SECRET);
        req.doctor = tokenDecode;
        next();

    } catch (error) {
        console.log("Error in user authentication middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export default authDoctor;
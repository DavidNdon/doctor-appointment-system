import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/mongoDB.js';
import { connectCloudinary } from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';



// app server
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// simple route
app.get('/', (req, res) => {
    res.send("Hello from server");
})

app.listen(PORT, async () => {
    try {
        await connectDB();
        await connectCloudinary(console.log("cloudinary connected"));
        console.log(`server running at http://localhost:${PORT}`);
    } catch (error) {
        console.log('internal server error', error);
    }
    
})
import express from "express";
import cors from "cors"
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5174"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials: true}));


// API ENDPOINTS
app.get("/", (req, res) => {
    res.send("Welcome to the AuthSys server!");
}) 

app.use('/api/auth', authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`))
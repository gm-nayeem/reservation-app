require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/userRoute");
const hotelsRoute = require("./routes/hotelRoute");
const roomsRoute = require("./routes/roomRoute");

const app = express();

// database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB.");
    } catch (error) {
        throw error;
    }
};
// disconnect
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(morgan("dev"))
app.use(cors())
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// error handle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// server port connection
const PORT = process.env.PORT || 8800;
app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend.");
});
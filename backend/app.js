const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:4000", "http://localhost:8080", "http://192.168.29.21:4000"];

const options = {
    origin: allowedOrigins,
};

app.use(cors(options));

//Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

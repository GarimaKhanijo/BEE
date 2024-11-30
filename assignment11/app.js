require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/admin", adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log("Server is running...");
        });
    })
    .catch((err) => console.error("Database connection error:", err));

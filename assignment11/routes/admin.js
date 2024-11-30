const express = require("express");
const Task = require("../models/Task");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

// Admin: Get All Tasks
router.get("/tasks", authenticate, authorizeAdmin, async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

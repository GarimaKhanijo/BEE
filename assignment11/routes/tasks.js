const express = require("express");
const Task = require("../models/Task");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

// Create Task
router.post("/", authenticate, async (req, res, next) => {
    try {
        const task = new Task({ ...req.body, userId: req.user.userId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
});

// Get Tasks (with pagination, sorting, and search)
router.get("/", authenticate, async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "createdAt", search = "" } = req.query;
        const query = { userId: req.user.userId, deleted: false };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        const tasks = await Task.find(query)
            .sort({ [sort]: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// Update Task
router.put("/:id", authenticate, async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// Delete Task (Soft Delete)
router.delete("/:id", authenticate, async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { deleted: true },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Completed"] },
    deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

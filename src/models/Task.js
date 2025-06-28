const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;

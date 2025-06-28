const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todo-app");
    console.log("Connected with DB");
  } catch (error) {
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected with DB");
  } catch (error) {
    throw error;
  }
};

module.exports = { connectDB, disconnectDB };

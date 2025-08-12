const mongoose = require("mongoose");

function ConnectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error", err));
}

module.exports = ConnectDB;

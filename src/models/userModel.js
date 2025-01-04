const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, require: true },
    roles: {
      type: [String],
      required: true,
      enum: ["admin", "manager", "user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

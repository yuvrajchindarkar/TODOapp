const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
});

module.exports = new mongoose.model("mytodo", TodoSchema);

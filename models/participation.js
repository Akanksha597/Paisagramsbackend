const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", ParticipantSchema);

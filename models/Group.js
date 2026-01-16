const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", groupSchema);

const Participant = require("../models/participation")

/* CREATE PARTICIPANT */
exports.createParticipant = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const participant = await Participant.create({ name, mobile });
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* GET ALL PARTICIPANTS */
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* UPDATE PARTICIPANT */
exports.updateParticipant = async (req, res) => {
  try {
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* DELETE PARTICIPANT */
exports.deleteParticipant = async (req, res) => {
  try {
    const deleted = await Participant.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

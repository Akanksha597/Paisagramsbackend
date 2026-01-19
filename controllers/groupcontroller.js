const Group = require("../models/Group");
const Event = require("../models/Event");
const Participant = require("../models/participation");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { eventId, participantIds } = req.body;

    if (!eventId || !participantIds || participantIds.length === 0) {
      return res.status(400).json({ message: "Event and participants are required" });
    }

    // Check if event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) return res.status(404).json({ message: "Event not found" });

    // Check if all participants exist
    const participantsExist = await Participant.find({ _id: { $in: participantIds } });
    if (participantsExist.length !== participantIds.length) {
      return res.status(404).json({ message: "Some participants not found" });
    }

    const group = new Group({ eventId, participantIds });
    await group.save();

    res.status(201).json({ message: "Group created successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("eventId", "name")
      .populate("participantIds", "name mobile");
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("eventId", "name")
      .populate("participantIds", "name mobile");

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    const { eventId, participantIds } = req.body;
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (eventId) {
      const eventExists = await Event.findById(eventId);
      if (!eventExists) return res.status(404).json({ message: "Event not found" });
      group.eventId = eventId;
    }

    if (participantIds && participantIds.length > 0) {
      const participantsExist = await Participant.find({ _id: { $in: participantIds } });
      if (participantsExist.length !== participantIds.length) {
        return res.status(404).json({ message: "Some participants not found" });
      }
      group.participantIds = participantIds;
    }

    await group.save();
    res.json({ message: "Group updated successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a group

exports.deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("Delete group error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const express = require("express");
const router = express.Router();
const {
  createParticipant,
  getParticipants,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

router.post("/", createParticipant);
router.get("/", getParticipants);
router.put("/:id", updateParticipant);
router.delete("/:id", deleteParticipant);

module.exports = router;

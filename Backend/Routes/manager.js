const express = require("express");
const router = express.Router();
const managerController = require("../Controllers/managerController");

// Get Manager Info
router.get("/:id", managerController.getManager);

// Get Training Center Managed by the Manager
router.get("/:id/training-center", managerController.getTrainingCenter);

// Manager Login
router.post("/login", managerController.login);

// Assign Manager to Training Center
router.post("/assign", managerController.assignManagerToCenter);

module.exports = router;

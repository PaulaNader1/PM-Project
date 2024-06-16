const managerModel = require("../Models/managerModel");
const trainingCenterModel = require("../Models/trainingCenterModel");

const managerController = {
  // Backend/Controllers/managerController.js

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const manager = await managerModel.findOne({ email });
      if (!manager) {
        return res.status(404).json({ message: "Email not found" });
      }

      if (password !== manager.password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      res
        .status(200)
        .json({
          message: "Login successful",
          managerId: manager._id,
          role: manager.role,
        });
    } catch (error) {
      console.error("Error logging in manager:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  // Get Manager Info
  getManager: async (req, res) => {
    try {
      const { id } = req.params;
      const manager = await managerModel.findById(id);
      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }
      res.status(200).json({ manager });
    } catch (error) {
      console.error("Error getting manager info:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get Training Center Info Managed by the Manager
  getTrainingCenter: async (req, res) => {
    try {
      const { id } = req.params;
      const manager = await managerModel.findById(id);
      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      const center = await trainingCenterModel.findOne({
        centerID: manager.trainingCenter.centerID,
      });
      if (!center) {
        return res.status(404).json({ message: "Training center not found" });
      }

      res.status(200).json({ center });
    } catch (error) {
      console.error("Error getting training center info:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Backend/Controllers/managerController.js

  assignManagerToCenter: async (req, res) => {
    try {
      const { managerId, centerId } = req.body;

      const manager = await managerModel.findById(managerId);
      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      const center = await trainingCenterModel.findOne({ centerID: centerId });
      if (!center) {
        return res.status(404).json({ message: "Training center not found" });
      }

      manager.trainingCenter = {
        centerID: center.centerID,
        name: center.name,
      };
      await manager.save();

      res
        .status(200)
        .json({ message: "Manager assigned to training center successfully" });
    } catch (error) {
      console.error("Error assigning manager to training center:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = managerController;

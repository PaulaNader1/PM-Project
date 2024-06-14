const managerModel = require("../Models/managerModel");
const trainingCenterModel = require("../Models/trainingCenterModel");

const managerController = {
    
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
    
          res.status(200).json({ message: "Login successful", managerId: manager._id });
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

            const center = await trainingCenterModel.findOne({ centerID: manager.trainingCenter.centerID });
            if (!center) {
                return res.status(404).json({ message: "Training center not found" });
            }

            res.status(200).json({ center });
        } catch (error) {
            console.error("Error getting training center info:", error);
            res.status(500).json({ message: "Server error" });
        }
    },
};

module.exports = managerController;

const managerModel = require("../Models/managerModel"); // Import the managerModel

const adminMiddleware = async (req, res, next) => {
  try {
    const manager = await managerModel.findById(req.userId); // Use managerModel instead of userModel
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    if (manager.role !== "admin") {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminMiddleware;

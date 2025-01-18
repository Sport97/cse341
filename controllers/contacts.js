const mongodb = require("../database/connect");
const contactController = {};
const contactData = require("../contacts.json");
const { ObjectId } = require("mongodb");

// contactController.getContacts = async (req, res) => {
//   try {
//     return res.status(200).json(contactData);
//   } catch (error) {
//     console.error("Error handling JSON data:", error);
//     res.status(500).json({ error: "Failed to load contact data" });
//   }
// };

contactController.getContacts = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection("contacts").find().toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

contactController.getContactByID = async (req, res) => {
  try {
    const id = req.params.id;
    const db = mongodb.getDb();
    const result = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

module.exports = contactController;

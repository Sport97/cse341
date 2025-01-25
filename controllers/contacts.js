const mongodb = require("../database/connect");
const contactsController = {};
const { ObjectId } = require("mongodb");

// const contactsData = require("../contacts.json");
// contactsController.getContacts = async (req, res) => {
//   try {
//     return res.status(200).json(contactData);
//   } catch (error) {
//     console.error("Error handling JSON data:", error);
//     res.status(500).json({ error: "Failed to load contact data" });
//   }
// };

contactsController.getContacts = async (req, res) => {
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

contactsController.getContactByID = async (req, res) => {
  try {
    const id = req.params.id;
    const db = mongodb.getDb();
    const result = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

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

contactsController.createContact = async (req, res) => {
  try {
    const contactInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const db = mongodb.getDb();
    const result = await db.collection("contacts").insertOne(contactInfo);

    if (result.acknowledged) {
      res
        .status(201)
        .json({ ...contactInfo, _id: result.insertedId, message: "Contact created successfully." });
    }
  } catch (error) {
    console.error("Error making new contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

contactsController.updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contactInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const db = mongodb.getDb();
    const result = await db
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(id) }, contactInfo);

    if (result.modifiedCount > 0) {
      res.status(200).json({ ...result, upsertedId: id, message: "Contact updated successfully." });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
};

contactsController.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const db = mongodb.getDb();
    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ ...result, deletedId: id, message: "Contact removed" });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = contactsController;

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");

// ROUTE 1 :Get all the notes using GET "/api/notes/fetchAllNotes" login req
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

//ROUTE 2 :Add a new note using POST "/api/notes/addnotes" login req
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a Valid title").isLength({ min: 2 }),
    body("tag", "Enter a Valid tag").isLength({ min: 2 }),
    body("description", "description must be more than 10 character").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if errors , return bad req + the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //New Note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const SavedNotes = await note.save();
      res.json(SavedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occurred");
    }
  }
);

//ROUTE 3 :Update a exsisting note using PUT "/api/notes/updatenote" login req
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create new note obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send(" note NOT FOUND");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("NOT Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

//ROUTE 4 :delete a exsisting note using DELETE "/api/notes/deletenote" login req
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //find note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send(" note NOT FOUND");
    }
    //delete only if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("NOT Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ SUCCESS: "NOTE DELETED", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});
module.exports = router;

const path = require("path");
const fs = require("fs");
const notesArray = require("../db/db.json");
const uuid = require("uuid");

module.exports = app => {
    app.get("/api/notes", (req, res) => {
        res.json(notesArray);
    })

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const file = path.join(__dirname, "../db/db.json");

        newNote.id = uuid();
        notesArray.push(newNote);

        fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
            if (err) throw err;
            console.log("New note has been saved!");
        });

        res.send(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        const file = path.join(__dirname, "../db/db.json");

        for(const note of notesArray){
            if(id === note.id) {
                const index = notesArray.indexOf(note);
                notesArray.splice(index, 1);
                fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
                    if (err) throw err;
                    console.log("Note has been deleted!");
                });
                res.end();
            }
        }
    })
}
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

function BoardCommunication() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteText.trim().length > 0) {
      const newNotes = [
        ...notes,
        {
          id: uuidv4(),
          text: noteText,
          color: randomColor({ luminosity: "light" }),
          defaultPosition: { x: 20, y: 20 },
        },
      ];
      setNotes(newNotes);
      setNoteText("");
    }
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const formatText = (text, limit) => {
    return text
      .split("")
      .map((char, index) => (index > 0 && index % limit === 0 ? char + "\n" : char))
      .join("");
  };

  return (
    <div className="board-frame">
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a note (max 50 letters)"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          maxLength={50} // Ensures users cannot type more than 50 characters
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="board">
        {notes.map((note) => (
          <Draggable
          key={note.id}
          bounds=".board"
          defaultPosition={note.defaultPosition}
          onStop={(e, data) => {
            const newNotes = notes.map((n) => {
              if (n.id === note.id) {
                return { ...n, defaultPosition: { x: data.x, y: data.y } };
              }
              return n;
            });
            setNotes(newNotes);
          }}
        >
          <div className="note" style={{ backgroundColor: note.color }}>
            <p>{formatText(note.text, 20)}</p>
            <button onClick={() => deleteNote(note.id)}>X</button>
          </div>
        </Draggable>
        ))}
      </div>
    </div>
  );
}

export default BoardCommunication;

import React, { useState, useContext } from "react";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from "./ThemeContext";
import ToggleTheme from "./hooksExercise";

function App() {
  const [favs, setFavs] = useState<{ [key: string]: boolean }>({});
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // Keeps track of the list of titles who are faved instead of id
  const toggleFav = (title: string) => {
    // copies over the favs using spread operator
    const updatedFavs = { ...favs };
    updatedFavs[title] = !updatedFavs[title];
    setFavs(updatedFavs);
  };

  //Gets the list of titles from favs object then keeps the one where fav is true
  const favTitles = Object.keys(favs).filter((title) => favs[title]); //filters to what we want

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  //Create a new sticky note and displays it
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  //Update note and then use HTML contentEditable tag for editing in place
  const handleNoteUpdate = (id: number, prop: string, value: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [prop]: value } : note
    );
    setNotes(updatedNotes);
  };

  //Goes through notes and only keep the one not selected
  //Remove it from list of favs as well
  const handleDeleteNote = (id: number, title: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id); //filters to what we want
    setNotes(updatedNotes);
    if (favs[title]) {
      toggleFav(title);
    }
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="app-container">
        {/* the form submitted automatically passed an object by browser as arg to the createNoteHandler function*/}
        <form className="note-form" onSubmit={createNoteHandler}>
          <div className="container">
            {/* Can use <input> without <label> but no text description so use placeholder */}
            {/* event.target refers to the element that triggered the event and then get its value input */}
            <input
              value={createNote.title}
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>

          <div className="container">
            {/*Unlike <input>, it's multi line, also can have placeholder*/}
            <textarea
              value={createNote.content}
              placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event?.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <select
              id="label"
              value={createNote.label}
              name="label"
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.work}>Work</option>
              <option value={Label.study}>Study</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div className="container">
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
              }}
            >
              <div className="notes-header">
                <button
                  className="favButton"
                  onClick={() => toggleFav(note.title)}
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                >
                  {favs[note.title] ? "❤️" : "♡"}
                </button>
                <button
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                  onClick={() => handleDeleteNote(note.id, note.title)}
                >
                  x
                </button>
              </div>
              <h2
                contentEditable
                onBlur={(event) =>
                  handleNoteUpdate(note.id, "title", event.target.innerText)
                }
              >
                {note.title}
              </h2>
              <p
                contentEditable
                onBlur={(event) =>
                  handleNoteUpdate(note.id, "content", event.target.innerText)
                }
              >
                {note.content}
              </p>
              <p
                contentEditable
                onBlur={(event) =>
                  handleNoteUpdate(note.id, "label", event.target.innerText)
                }
              >
                {note.label}
              </p>
            </div>
          ))}
        </div>

        {/* List of fav titles */}
        <div className="list-favs">
          <h2>List of favorites:</h2>
          <ul>
            {favTitles.length > 0 ? (
              favTitles.map((title) => <li key={title}>{title}</li>)
            ) : (
              <p>No favorites yet.</p>
            )}
          </ul>
        </div>

        {/* Passing the updater function that changes the current theme as a prop*/}
        <ToggleTheme setCurrentTheme={setCurrentTheme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

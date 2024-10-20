import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { ThemeContext, themes } from "./ThemeContext";
import ToggleTheme from "./hooksExercise";

//Required Test for reading default sticky notes
test("read default sticky notes", () => {
  render(<StickyNotes />);
  //Read individual sticky notes
  const defaultNote2Title = screen.getByText("test note 2 title");
  const defaultNote2Content = screen.getByText("test note 2 content");
  const defaultNote2Label = screen.getByTestId("label2");
  expect(defaultNote2Title).toBeInTheDocument();
  expect(defaultNote2Content).toBeInTheDocument();
  expect(defaultNote2Label).toBeInTheDocument();

  const defaultNote4Title = screen.getByText("test note 4 title");
  const defaultNote4Content = screen.getByText("test note 4 content");
  const defaultNote4Label = screen.getByTestId("label4");
  expect(defaultNote4Title).toBeInTheDocument();
  expect(defaultNote4Content).toBeInTheDocument();
  expect(defaultNote4Label).toBeInTheDocument();

  //Read all displayed sticky note titles by counting
  const noteTitles = screen.getAllByRole("heading"); //get the list of all headings
  expect(noteTitles.length).toBe(7); //since default is 6 sticky notes + 1 for FavTitles header
  expect(noteTitles[4]).toHaveTextContent("test note 5 title"); //check the titles
  expect(noteTitles[5]).toHaveTextContent("test note 6 title");
  expect(noteTitles[6]).toHaveTextContent("List of favorites"); //but why .toHaveTextContext over .toBe

  //Read all sticky note titles, content, and label
  const notes = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  notes.forEach((note) => {
    const titleElement = screen.getByTestId(`title${note.id}`); //or can put "title" + note.id
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(`test note ${note.id} title`); // or can put "test note " + note.id + " title"

    const contentElement = screen.getByTestId(`content${note.id}`);
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent(`test note ${note.id} content`);

    const labelElement = screen.getByTestId(`label${note.id}`);
    expect(labelElement).toBeInTheDocument();
  });
});

//Required Test for Creating and Reading Sticky Notes
describe("Create Sticky Note", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    //Create and read another sticky note
    fireEvent.change(createNoteTitleInput, {
      target: { value: "Another New Note" },
    });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Another Note content yay" },
    });
    fireEvent.click(createNoteButton);

    const anotherNoteTitle = screen.getByText("Another New Note");
    const anotherNoteContent = screen.getByText("Another Note content yay");

    expect(anotherNoteTitle).toHaveTextContent("Another New Note");
    expect(anotherNoteContent).toHaveTextContent("Another Note content yay");
  });
});

//Required Test for updating a sticky note
describe("Updating Sticky Note", () => {
  test("Updating Sticky Note 3", () => {
    render(<StickyNotes />);
    //Updating note 3 assuming it exists
    const note3Title = screen.getByTestId("title3");
    const note3Content = screen.getByTestId("content3");
    const note3Label = screen.getByTestId("label3");

    //Now update the 'innerHTML' of the note
    fireEvent.input(note3Title, {
      target: { innerHTML: "Updated Note 3 Title" },
    });
    expect(note3Title).toHaveTextContent("Updated Note 3 Title"); //this or
    fireEvent.input(note3Content, {
      target: { innerHTML: "updated note 3 content woohoo!" },
    });
    expect(note3Content.innerHTML).toBe("updated note 3 content woohoo!"); //.innerHTML with .toBe
    fireEvent.input(note3Label, { target: { innerHTML: "random" } });
    expect(note3Label.innerHTML).toBe("random");

    //Maybe update another note
  });
});

//Test for creating and updating a sticky note
test("Create and Update Sticky Note", () => {
  render(<StickyNotes />);
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  //Create the new note
  fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
  fireEvent.change(createNoteContentTextarea, {
    target: { value: "Note content" },
  });
  fireEvent.click(createNoteButton);

  //Update the new note
  fireEvent.input(createNoteTitleInput, {
    target: { innerHTML: "This is the New Title" },
  });
  fireEvent.input(createNoteContentTextarea, {
    target: { innerHTML: "this is the new content" },
  });
  expect(createNoteTitleInput.innerHTML).toBe("This is the New Title");
  expect(createNoteContentTextarea.innerHTML).toBe("this is the new content");
});

//Required Test for deleting a sticky note once 'x' button is pressed
describe("Deleting Sticky Note", () => {
  test("Deleting Sticky Note 2", () => {
    render(<StickyNotes />);

    //Delete note 2
    const deleteButton = screen.getByTestId("deleteNote2");
    fireEvent.click(deleteButton);

    //Ensure the note is removed
    const deletedNote = screen.queryByTestId("title2"); //which should return null if can't find it
    expect(deletedNote).not.toBeInTheDocument(); // testing the absence of the element which null signifies
  });

  test("Creating and deleting sticky note", () => {
    render(<StickyNotes />);

    //Create note
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content blah blah" },
    });
    fireEvent.click(createNoteButton);

    //Read note to ensure its displayed
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content blah blah");
    expect(newNoteTitle).toHaveTextContent("New Note");
    expect(newNoteContent).toHaveTextContent("Note content blah blah");

    //Delete note
    const deleteButton = screen.getByTestId("deleteNote7"); //bc newest note is the 7th one
    fireEvent.click(deleteButton);
    const deletedNote = screen.queryByText("Note content blah blah");
    expect(deletedNote).not.toBeInTheDocument();
  });
});

//Test for liking and unliking a sticky note
//Test for clicking on the toggle button

describe("Edge cases", () => {
  test("Zero sticky notes", () => {
    render(<StickyNotes />);
    const defaultNoteTitles = screen.getAllByRole("heading");
    expect(defaultNoteTitles.length).toBe(7); //counted the heading for fav titles as well

    //Delete three notes
    const deleteButton1 = screen.getByTestId("deleteNote1");
    fireEvent.click(deleteButton1); //can also directly put above assignment inside here
    const deletedNote1 = screen.queryByText("test note 1 title");
    expect(deletedNote1).not.toBeInTheDocument(); //can also directly put above assignment inside here

    fireEvent.click(screen.getByTestId("deleteNote2"));
    expect(screen.queryByText("test note 2 title")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("deleteNote3"));
    expect(screen.queryByText("test note 3 title")).not.toBeInTheDocument();

    //Check num notes displayed
    const updatedNoteTitles = screen.getAllByRole("heading");
    expect(updatedNoteTitles.length).toBe(4);

    //Delete the rest of the three notes
    fireEvent.click(screen.getByTestId("deleteNote4"));
    expect(screen.queryByText("test note 4 title")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("deleteNote5"));
    expect(screen.queryByText("test note 5 title")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("deleteNote6"));
    expect(screen.queryByText("test note 6 title")).not.toBeInTheDocument();

    //Check num notes displayed which should be none
    const finalNoteTitles = screen.getAllByRole("heading");
    expect(finalNoteTitles.length).toBe(1); //which is the heading for fav titles

    //Another way of checking it
    const notes = screen.queryAllByTestId(/title-/);
    expect(notes.length).toBe(0);
  });
});

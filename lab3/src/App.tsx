import "./App.css";
import { ToDoList } from "./toDoList";
import { StickyNotes } from "./stickyNotes";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar";

const App = () => {
  return (
    <div>
      <Navbar />

      {/* Routes intelligently choose which Route are the best to render */}
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        {/* leads to the same page but with different URL parameter */}
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;

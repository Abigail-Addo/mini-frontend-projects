import "./App.css";
import { FaPlus } from "react-icons/fa6";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <>
      <header>
        <h1>To do List</h1>
      </header>
      <form>
        <input type="text" className="todo-inputs" />
        <button className="todo-button">
          <FaPlus />
        </button>
      </form>

      <TodoList />
    </>
  );
}

export default App;

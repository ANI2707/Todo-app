import "./App.css";
import InputTodo from "./componenets/InputTodo";
import ListTodos from "./componenets/ListTodos";

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos/>
      </div>
    </>
  );
}

export default App;

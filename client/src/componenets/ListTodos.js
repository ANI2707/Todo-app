import React, { useEffect, useState } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete function
  const deleteTodos =async(id)=>{
    try {
        const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`,{
            method:"DELETE"
        });

        setTodos(todos.filter(todo=>todo.todo_id !== id));
        // console.log(deleteTodo);

    } catch (error) {
        console.log(error.message);
    }
  }
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  // console.log(todos);
  return (
    <>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                <button className="btn btn-danger" onClick={()=>deleteTodos(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;

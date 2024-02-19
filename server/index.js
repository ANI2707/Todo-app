const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse JSON request bodies

// Routes

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body; // Extract 'description' from request body
    // Insert new todo into the database and return the inserted todo
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]); // Send the newly inserted todo as a JSON response
  } catch (err) {
    console.log(err.message);
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    // Fetch all todos from the database
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows); // Send all todos as a JSON response
  } catch (err) {
    console.log(err.message);
  }
});

// Get a specific todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract 'id' from request parameters
    // Fetch the todo with the specified ID from the database
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]); // Send the fetched todo as a JSON response
  } catch (err) {
    console.log(err.message);
  }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract 'id' from request parameters
    const { description } = req.body; // Extract 'description' from request body
    // Update the description of the todo with the specified ID
    await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description, id]);
    res.json("Todo was updated"); // Send success message as a JSON response
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract 'id' from request parameters
    // Delete the todo with the specified ID from the database
    await pool.query('DELETE FROM todo WHERE todo_id=$1', [id]);
    res.json('Todo Deleted Successfully'); // Send success message as a JSON response
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

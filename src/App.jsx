import { useState } from "react";
import "./App.css";
import StudentCard from "./components/StudentCard";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Exercise 4 (Event Handling + Console Log)
  const handleClick = () => {
    console.log("Input Value:", inputValue);
    alert(inputValue);
  };

  // Exercise 5 (Form + Console Log + Clear Fields)
  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Course:", course);

    alert(`Name: ${name} | Course: ${course}`);

    // Clear input fields
    setName("");
    setCourse("");
  };

  return (
    <div className="container">
      <h1>🎓 Student Dashboard</h1>

      {/* Exercise 1 & 2 */}
      <StudentCard 
        name="Prem Hari"
        course="Full Stack Bootcamp"
        status="Active"
      />

      {/* Exercise 3 & 4 */}
      <div className="section">
        <h3>Input Field</h3>

        <input
          type="text"
          placeholder="Type something"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <br /><br />

        <button onClick={handleClick}>
          Show Input
        </button>
      </div>

      <hr />

      {/* Exercise 5 */}
      <div className="section">
        <h3>Simple Form</h3>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSubmit}>
          Submit Form
        </button>
      </div>
    </div>
  );
}

export default App;
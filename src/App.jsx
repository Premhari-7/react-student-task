import { useState, useEffect } from "react";
import "./App.css";
import StudentCard from "./components/StudentCard";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [students, setStudents] = useState([
    { id: 1, name: "Prem", course: "React" },
    { id: 2, name: "Hari", course: "Java" },
    { id: 3, name: "Maruthu", course: "Python" },
    { id: 4, name: "Maari", course: "C++" },
    { id: 5, name: "Sasoori", course: "JavaScript" }
  ]);

  const [users, setUsers] = useState([]);

  const handleClick = () => {
    alert(inputValue);
  };

  const handleSubmit = () => {
    if (!name || !course) {
      alert("Enter name and course");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name,
      course
    };

    setStudents([...students, newStudent]);
    setName("");
    setCourse("");
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="container">
      <h2>🎓 Student Dashboard</h2>

      <StudentCard 
        name="Prem Hari"
        course="Full Stack Bootcamp"
        status="Active"
      />

      <div className="sections">

        {/* Input + Form */}
        <div className="box">
          <h4>Input & Form</h4>

          <input
            type="text"
            placeholder="Type something"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button onClick={handleClick}>Show</button>

          <hr />

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <button onClick={handleSubmit}>Add Student</button>
        </div>

        {/* Students */}
        <div className="box">
          <h4>Students</h4>

          {students.map((s) => (
            <div key={s.id} className="card">
              {s.name} - {s.course}
            </div>
          ))}
        </div>

        {/* API Users */}
        <div className="box">
          <h4>API Users</h4>

          {users.map((u) => (
            <div key={u.id} className="card">
              {u.name}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import "./App.css";
import StudentCard from "./components/StudentCard";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "1234"
      })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    alert("Login successful");
  };

  /* ================= PROTECTED ================= */
  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  /* ================= ADD ================= */
  const handleSubmit = async () => {
    if (!name || !course) {
      alert("Enter name and course");
      return;
    }

    const res = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, course })
    });

    const data = await res.json();
    setStudents([...students, data]);

    setName("");
    setCourse("");
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  /* ================= UPDATE ================= */
  const updateStudent = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Updated Name"
      })
    });

    alert("Updated");

    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();
    setStudents(data);
  };

  return (
    <div className="container">
      <h2>🎓 Student Dashboard</h2>

      <div className="profile-card">
        <h3>Prem Hari</h3>
        <p>Full Stack Bootcamp</p>
        <p>Active</p>
      </div>

      <div className="sections">

        {/* LOGIN + FORM */}
        <div className="box">
          <h4>Login & Form</h4>

          <button onClick={handleLogin}>Login</button>
          <button onClick={getProfile}>Get Profile</button>

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

        {/* STUDENTS */}
        <div className="box">
          <h4>Students</h4>

          {students.map((s) => (
            <div key={s._id} className="student-card">
              {s.name} - {s.course}
              <button onClick={() => updateStudent(s._id)}>
                Update
              </button>
            </div>
          ))}
        </div>

        {/* API USERS */}
        <div className="box">
          <h4>API Users</h4>

          {users.slice(0, 5).map((u) => (
            <div key={u.id} className="student-card">
              {u.name}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
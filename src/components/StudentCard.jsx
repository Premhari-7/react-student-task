import "./StudentCard.css";

function StudentCard({ name, course, status }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{course}</p>
      <p>{status}</p>
    </div>
  );
}

export default StudentCard;
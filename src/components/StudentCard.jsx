import "./StudentCard.css";

function StudentCard({ name, course, status }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p> {course}</p>
      <p> {status}</p>
    </div>
  );
}

export default StudentCard;
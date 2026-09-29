import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://mern-student-management-5ua7.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    if (!name || !department) {
      alert("Please enter name and department");
      return;
    }

    try {
      await axios.post(`${API_URL}/students`, {
        name,
        department,
      });

      setName("");
      setDepartment("");

      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Student Management System</h1>

        <form onSubmit={addStudent} style={styles.form}>
          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.addButton}>
            Add Student
          </button>
        </form>

        <h2>Students</h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <div key={student._id} style={styles.student}>
              <div>
                <strong>{student.name}</strong>
                <p>{student.department}</p>
              </div>

              <button
                onClick={() => deleteStudent(student._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  addButton: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  student: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
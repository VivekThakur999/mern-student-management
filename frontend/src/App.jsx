import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://mern-student-management-5ua7.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!name.trim() || !department.trim()) {
      alert("Please enter name and department");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/students`, {
        name: name.trim(),
        department: department.trim(),
      });

      setName("");
      setDepartment("");

      await fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <div className="header">
            <div className="logo">🎓</div>

            <div>
              <h1>Student Management</h1>
              <p>Add and manage student records</p>
            </div>
          </div>

          <form onSubmit={addStudent} className="form">
            <div className="input-group">
              <label>Student Name</label>

              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Department</label>

              <input
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <button type="submit" className="add-button" disabled={loading}>
              {loading ? "Adding..." : "+ Add Student"}
            </button>
          </form>

          <div className="students-section">
            <div className="section-title">
              <h2>Students</h2>
              <span>{students.length}</span>
            </div>

            {students.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">👨‍🎓</div>
                <p>No students found</p>
                <span>Add your first student above</span>
              </div>
            ) : (
              <div className="student-list">
                {students.map((student) => (
                  <div className="student" key={student._id}>
                    <div className="student-info">
                      <div className="avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{student.name}</strong>
                        <p>{student.department}</p>
                      </div>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="footer">MERN Stack • Student Management System</p>
      </div>
    </div>
  );
}

export default App;
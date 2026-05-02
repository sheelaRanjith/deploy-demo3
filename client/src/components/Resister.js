import { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [users, setUsers] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/register`,
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      const usersRes = await axios.get(`${API_URL}/api/users`);
      setUsers(usersRes.data);

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Register Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>

      <h3>Users List</h3>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name} - {user.email}</p>
        </div>
      ))}
    </div>
  );
}
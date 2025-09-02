import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(" Login error:", err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="form-container" style={{background:"gold"}}>
      <h2>Login here to continue</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input style={{background:"white"}}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
        style={{background:"white", color:"black"}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;

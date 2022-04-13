import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="form-page">
      <form>
        <input
          type="text"
          className="username"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          className="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="button"
          className="submit-btn"
          value="Login"
          disabled="true"
        />
        <p
          className="error-message"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong !
        </p>
      </form>
    </div>
  );
};

export default Login;

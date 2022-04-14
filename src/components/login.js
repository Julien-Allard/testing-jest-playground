import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!data) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        setData(response.data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
      setIsLoading(false);
    } else {
      setData(null);
    }
  };

  return (
    <div className="form-page">
      <span className="welcome">{data && `Welcome ${data.name} !`}</span>
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
          value={isLoading ? "Please wait..." : data ? "Disconnect" : "Login"}
          disabled={!password || !username}
          onClick={handleLogin}
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

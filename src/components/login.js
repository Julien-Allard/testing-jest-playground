const Login = () => {
  return (
    <div className="form-page">
      <form>
        <input type="text" className="username" />
        <input type="password" className="password" />
        <input type="button" className="submit-btn" value="Login" />
      </form>
    </div>
  );
};

export default Login;

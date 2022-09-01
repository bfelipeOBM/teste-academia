import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login_sideimage.png";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const { currentUser } = useAuth();
  const { currentUser } = { currentUser: null };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login__left">
        <img src={loginImg} alt="login" className="login__img" />
      </div>
      <div className="login__right">
        <h1>Log In</h1>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="login__form__input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="login__form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Log In
          </button>
        </form>
        <div className="login__right__signup">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

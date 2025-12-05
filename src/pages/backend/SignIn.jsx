import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import "../../css/backend/main.min.css";

const SignIn = () => {
  const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL ||
    process.env.REACT_APP_BASE_URL ||
    "http://localhost:8000/";

  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();
  const signInUser = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const divErrorRef = useRef();

  useEffect(() => {
    if (isAuth) navigate("/admin/dashboard");

    const html = document.documentElement;
    html.classList.remove(
      "has-aside-left",
      "has-aside-mobile-transition",
      "has-navbar-fixed-top",
      "has-aside-expanded"
    );
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}api/login`, {
        email,
        password,
      });

      if (
        signInUser({
          auth: {
            token: data.token,
            type: "Bearer",
            expiresIn: 300000,
            authState: data,
          },
        })
      ) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate("/admin/portfolios");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Erreur de connexion";
      divErrorRef.current.classList.add("msg__error");
      divErrorRef.current.innerText = message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <form className="px-3" onSubmit={handleSubmit}>
        <div ref={divErrorRef}></div>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          id="username"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="input mb-2"
          autoComplete="email"
          autoFocus
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          autoComplete="current-password"
        />

        <div className="control">
          <button
            type="submit"
            className={`button is-primary mt-3 ${
              loading ? "is-loading" : ""
            }`}
            disabled={loading}
          >
            <span>Valider</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

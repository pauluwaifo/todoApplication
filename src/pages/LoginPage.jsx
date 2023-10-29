// LOGIN PAGE
import React, { useContext, useState } from "react";
import AppContext from "../context/appContext";
import { LOGIN } from "../actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const { authDispatch, isAuth, isLoading, loadingDispatch } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        loadingDispatch({ type: "loadingTrue" });
        const user = userCredential.user;
        authDispatch({ type: LOGIN, payload: user });
        navigate("/");
        console.log(isAuth);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
    console.log(email);
    // navigate('/')
  };

  return (
    <>
      <h1 className="fw-bold color-white lh-0 mt-10 fs-5">TO DO</h1>
      <p className="color-white l-space">Reminds Everything</p>
      <div className="sign mt-10">
        <div className="b-top-right p-absolute-top-right w-1 p-2 align-end b-color-white"></div>
        <div className="p-2 align-center">
          <h5 className="color-white">Login</h5>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password */}
            <div className="password-holder">
              <input
                type={passwordType}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="pass-toggler color-white"
                onClick={() =>
                  passwordType == "password"
                    ? setPasswordType("text")
                    : setPasswordType("password")
                }
              >
                {passwordType == "password" ? (
                  <i className="far fa-eye"></i>
                ) : (
                  <i className="far fa-eye-slash"></i>
                )}
              </button>
            </div>
            {error && <p className="text-danger">Email or password is wrong</p>}
            <button type="submit" className="b-none">
              Login
            </button>
          </form>
        </div>
        <Link to="/signup" className="color-white">
          Sign up
        </Link>
        <div className="b-bottom-left p-absolute-bottom-left w-1 p-2 b-color-white"></div>
      </div>
    </>
  );
}

export default Login;

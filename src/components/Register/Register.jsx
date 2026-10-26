import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    console.log("registerClicked", email, password, terms);

    const length6Pattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`';]/;
    if (!length6Pattern.test(password)) {
      console.log("Password did not match");
      setError("Password must be 6 character or longer");
      return;
    } else if (!casePattern.test(password)) {
      setError(
        "Password must have at least one uppercase and lowercase character",
      );
      return;
    } else if (!specialCharRegex.test(password)) {
      setError("password must contain one special character");
      return;
    }
    // reset status: success or error
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("please accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("After creation of a new user", result.user);
        setSuccess(true);
        event.target.reset();
        // send verification
        sendEmailVerification(result.user).then(() => {
          alert("Please login to your email and verify you email address");
        });
      })
      .catch((error) => {
        console.log("errror happend", error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      onClick={handleTogglePasswordShow}
                      className="btn btn-xs absolute top-2 right-5"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
                    </button>
                  </div>
                  <div>
                    <label class="label">
                      <input type="checkbox" name="terms" class="checkbox" />
                      Accept Our Terms & Conditions
                    </label>
                  </div>
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                {success && (
                  <p className="text-green-500">Account create succcessfully</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
              </form>
              <p>
                Allreay have an account?{" "}
                <Link className="text-blue-400 underline" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

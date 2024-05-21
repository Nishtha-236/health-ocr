import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User is signed in
      const user = userCredential.user;
      console.log("User logged in:", user);
      navigate("/");
      // You can redirect the user to another page here
    } catch (error) {
      // Handle login errors
      setError(error.message);
      console.error("Login Error:", error.message);
    }
  };
  const handleForgotPassword = () => {
    setError(null);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully");
          setMessage("Password reset email sent successfully.");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error.message);
          setError(error.message);
        });
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-auto w-auto"
          src="logo-black.jpg"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                {/* Link for Forgot Password */}
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-semibold text-sky-600 hover:text-sky-500 focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-bold text-center mt-4">{error}</div>}
        {message && <div className="text-green-500 text-sm font-bold text-center mt-4">{message}</div>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Login
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

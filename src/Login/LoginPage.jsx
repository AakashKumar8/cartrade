import React, { useState } from 'react';
import './LoginPage.css';

// Used for navigation after successful login
import { useNavigate } from 'react-router-dom';

// Firebase authentication method
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Component/firebase';

// For displaying toast notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // State variables to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Attempt to sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Show success toast message
      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      // Navigate to home page after successful login
      navigate('/');
    } catch (error) {
      // Show specific error messages based on error code
      if (error.code === 'auth/user-not-found') {
        toast.error("No account found with this email", { position: "top-center" });
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password", { position: "top-center" });
      } else {
        toast.error("Login failed. Please try again.", { position: "top-center" });
      }
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Walmart logo at the top */}
      <div className="walmart-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png"
          alt="Walmart Logo"
        />
      </div>

      {/* Login form box */}
      <div className="login-box">
        <h2 className="login-title">Sign in or Create Account</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email input */}
          <div>
            <label className="login-label">Email Address</label>
          </div>
          <div>
            <input
              placeholder="Enter Email"
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="login-label">Password</label>
          </div>
          <div>
            <input
              placeholder="Enter Password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button">Log In</button>
        </form>

        {/* Footer information */}
        <p className="login-footer">
          By continuing, you agree to Walmart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
        
        {/* Link to registration page */}
        <p className="login-footer">
          <a href="/RegisterPage">Register</a>
        </p>
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

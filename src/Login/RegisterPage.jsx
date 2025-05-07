import React, { useState } from 'react';
import './LoginPage.css'; // Reuse the same CSS styles as LoginPage

import { useNavigate } from 'react-router-dom';

// Firebase imports for auth and Firestore database
import { auth, db } from "../Component/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Toast for user notifications
import { toast } from 'react-toastify';

const RegisterPage = () => {
  // State variables to manage user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook to redirect users

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Create user using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      console.log(user); // Log newly created user

      // If user is created successfully, store user info in Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          fullName: name,
          email: email,
        });
      }

      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      // Redirect to login page after successful registration
      navigate('/LoginPage');
    } catch (error) {
      // Display appropriate alert based on error type
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please log in or use a different email.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters.');
      } else {
        alert('Registration failed. Please try again later.');
      }

      // Log error and still show success toast (optional/likely unintended — should be error)
      console.error("Registration Error:", error.message);
      toast.success("User Registered Successfully!!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="login-container">
      {/* Walmart logo section */}
      <div className="walmart-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png"
          alt="Walmart Logo"
        />
      </div>

      {/* Registration form box */}
      <div className="login-box">
        <h2 className="login-title">Create Your Account</h2>

        {/* Registration form */}
        <form onSubmit={handleRegister} className="login-form">
          {/* Full name field */}
          <div>
            <label className="login-label">Full Name</label>
          </div>
          <div>
            <input
              placeholder="Enter Full Name"
              type="text"
              className="login-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email field */}
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

          {/* Password field */}
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
          <button type="submit" className="login-button">Register</button>
        </form>

        {/* Terms and navigation links */}
        <p className="login-footer">
          By continuing, you agree to Walmart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
        <p className="login-footer">
          Already have an account? <a href="/LoginPage">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

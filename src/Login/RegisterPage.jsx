import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../Component/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CarTradeLogo from '../Assets/CarTrade.png';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          fullName: name,
          email: email,
        });
      }

      toast.success("User Registered Successfully!", {
        position: "top-center",
      });

      navigate('/LoginPage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("This email is already registered.", {
          position: "top-center",
        });
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address.", {
          position: "top-center",
        });
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password should be at least 6 characters.", {
          position: "top-center",
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
        });
      }

      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="walmart-logo">
        <img src={CarTradeLogo} alt="CarTrade Logo" />
      </div>

      <div className="login-box">
        <h2 className="login-title">Create Your Account</h2>

        <form onSubmit={handleRegister} className="login-form">
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

          <button type="submit" className="login-button">Register</button>
        </form>

        <p className="login-footer">
          By continuing, you agree to CarTrade's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
        <p className="login-footer">
          Already have an account? <a href="/LoginPage">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

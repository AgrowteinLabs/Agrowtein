import React from 'react';
import './Login.css';
import Topbar from './Topbar'; // Ensure these paths are correct
import Navbar from './Navbar'; // Ensure these paths are correct

const Login = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <div className="login-left">
            <div className="login-icon">
              <i className="fa fa-user-circle"></i>
            </div>
            <form>
              <div className="login-input">
                <input type="text" placeholder="USERNAME" />
              </div>
              <div className="login-input">
                <input type="password" placeholder="PASSWORD" />
              </div>
              <div className="login-remember">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
                <a href="#" className="forgot-password">Forgot your password?</a>
              </div>
              <button type="submit" className="login-button">LOGIN</button>
            </form>
          </div>
          <div className="login-right">
            <h1>Welcome.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet ullamcorper erat a tincidunt.</p>
            <p>Not a member? <a href="#" className="sign-up">Sign up now</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
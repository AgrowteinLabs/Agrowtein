import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/Logo-png.png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 py-2 navbar-custom">
      <Link to="/" className="navbar-brand p-0">
        <img src={logo} alt="Startup Logo" className="me-2" width="200" height="50" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <NavLink exact to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/about" className="nav-item nav-link" activeClassName="active">About us</NavLink>
          <NavLink to="/products" className="nav-item nav-link" activeClassName="active">Products and Services</NavLink>
          <div className={`nav-item dropdown ${isActive(['/features', '/team']) ? 'active' : ''}`}>
            <Link to="#" className="nav-link dropdown-toggle" id="pagesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Pages
            </Link>
            <div className="dropdown-menu m-0" aria-labelledby="pagesDropdown">
              <NavLink to="/features" className="dropdown-item" activeClassName="active">Features</NavLink>
              <NavLink to="/team" className="dropdown-item" activeClassName="active">Team Members</NavLink>
            </div>
          </div>
          <NavLink to="/blogs" className="nav-item nav-link" activeClassName="active">Blogs</NavLink>
          <NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Contact Us</NavLink>
        </div>
        <NavLink to="/login" className="btn btn-success py-2 px-3 ms-2" activeClassName="active">Log In</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

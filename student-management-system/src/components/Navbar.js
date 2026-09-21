import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Reading the location makes the Navbar re-render on every page change,
  // so it appears after login and disappears after sign out.
  useLocation();

  // No navbar on the login page.
  if (!isLoggedIn()) {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);

  const signOut = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-accent" to="/students" onClick={closeMenu}>
          Student Manager
        </Link>

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav ms-auto align-items-md-center">
            <li className="nav-item">
              {/* NavLink adds the "active" class to the current page's link */}
              <NavLink className="nav-link" to="/students" end onClick={closeMenu}>
                Student List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students/add" onClick={closeMenu}>
                Add Student
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile" onClick={closeMenu}>
                User Profile
              </NavLink>
            </li>
            <li className="nav-item ms-md-2 mt-2 mt-md-0">
              <button className="btn btn-outline-primary btn-sm" onClick={signOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

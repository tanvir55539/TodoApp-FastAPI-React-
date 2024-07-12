import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout';

const Navbar = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark main-color fixed-top">
        <Link className="navbar-brand" to="#">Todo App</Link>
        <button className="navbar-togler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {user ? (
              <li className="nav-item m-1">
                <a className="btn btn-outline-light" href="/auth/logout">Logout</a>
              </li>
            ) : (
              <li className="nav-item m-1">
                <Link className="btn btn-outline-light" to="/auth">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navTo = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navTo("/LogIn");
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/ ">
              iNoteBook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/About" ? "active" : " "
                    }`}
                    to="/About"
                  >
                    About
                  </Link>
                </li>
              </ul>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    role="button"
                    type="button"
                    to="/SignUp"
                    className="btn btn-info mx-2"
                  >
                    Sign Up
                  </Link>
                  <Link
                    role="button"
                    type="button"
                    to="/LogIn"
                    className="btn btn-info mx-2"
                  >
                    Log In
                  </Link>
                </form>
              ) : (
                <button onClick={handleClick} className="btn btn-info mx-2 ">
                  Log Out
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

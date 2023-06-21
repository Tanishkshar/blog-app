import React from "react";
import { Link } from "react-router-dom";
import transitions from "bootstrap";

const header = ({ active, setActive, user, handlelogout }) => {
  const user_id = user?.uid;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid bg-faded padding-media">
          <div className="container padding-media">
            <nav className="navbar navbar-toggleable-md navbar-light">
              <button
                className="navbar-toggler mt-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                data-bs-parent="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="true"
                aria-label="Toggle Navigation"
              >
                <span className="fa fa-bars"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <li
                      style={{
                        marginRight: "40px",
                        cursor: "pointer",
                      }}
                      className={`nav-item nav-link ${
                        active === "Home" ? "active" : ""
                      } `}
                      onClick={() => setActive("Home")}
                    >
                      Home
                    </li>
                  </Link>

                  <Link to="/create" style={{ textDecoration: "none" }}>
                    <li
                      style={{ marginRight: "40px", cursor: "pointer" }}
                      className={`nav-item nav-link ${
                        active === "create" ? "active" : ""
                      } `}
                      onClick={() => setActive("create")}
                    >
                      Create
                    </li>
                  </Link>

                  <Link to="/about" style={{ textDecoration: "none" }}>
                    <li
                      style={{ marginRight: "40px", cursor: "pointer" }}
                      className={`nav-item nav-link ${
                        active === "about" ? "active" : ""
                      } `}
                      onClick={() => setActive("about")}
                    >
                      About
                    </li>
                  </Link>
                </ul>

                <div className="row g-3">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {user_id ? (
                      <>
                        <div className="profile-logo">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
                            alt="img"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginTop: "12px",
                              marginRight: "14px",
                            }}
                          />
                        </div>
                        <p style={{ marginTop: "13px", marginLeft: "10px" }}>
                          {user?.displayName}
                        </p>
                        <li
                          onClick={handlelogout}
                          style={{
                            marginLeft: "33px",
                            cursor: "pointer",
                            marginTop: "4px",
                          }}
                          className="nav-item nav-link"
                        >
                          Logout
                        </li>
                      </>
                    ) : (
                      <Link to="/auth" style={{ textDecoration: "none" }}>
                        <li
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          className={`nav-item nav-link ${
                            active === "auth" ? "active" : ""
                          } `}
                          onClick={() => setActive("auth")}
                        >
                          Login
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
};

export default header;

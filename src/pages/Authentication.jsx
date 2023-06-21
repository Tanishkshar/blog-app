import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Authentication = ({ active, setActive, user }) => {
  const initstate = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initstate);
  const [signup, setSignup] = useState(false);

  const { email, password, firstname, lastname, confirmpassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleauthentication = async (event) => {
    event.preventDefault();
    if (!signup) {
      event.preventDefault();
      // signin
      if (!email || !password) {
        toast.error("Pls fill all the fields");
      } else {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          toast.success("successfully logged In");
          setActive("Home");
        } catch {
          toast.error("Incorrect Email or Password");
        }
      }
    } else {
      if (!firstname || !lastname || !password || !confirmpassword || !email) {
        return toast.error("Pls fill all the fields");
      } else {
        if (password !== confirmpassword) {
          return toast.error("Password Doesn't matches");
        } else {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, {
            displayName: `${firstname} ${lastname}`,
          });
          setActive("/");
        }
      }
    }
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {!signup ? "Sign-In" : "Sign-Up"}
            </div>
          </div>

          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleauthentication}>
                {signup && (
                  <>
                    <div className="col-6 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="Enter Your First Name..."
                        value={firstname}
                        name="firstname"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-6 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="Enter Your Last Name..."
                        value={lastname}
                        name="lastname"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 py-3">
                      <input
                        type="email"
                        className="form-control input-text-box"
                        placeholder="Enter Your Email..."
                        value={email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        name="confirmpassword"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {!signup && (
                  <>
                    <div className="col-12 py-3">
                      <input
                        type="email"
                        className="form-control input-text-box"
                        placeholder="Enter Your Email..."
                        value={email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 py-3">
                      <input
                        type="password"
                        className="form-control input-text-box"
                        placeholder="Enter Your Password..."
                        value={password}
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="col-12 py-3 text-center">
                  <button
                    className={`btn ${
                      signup ? "btn-sign-up" : "btn-sign-in"
                    }  `}
                    type="submit"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    {signup ? "SignUp" : "SignIn"}
                  </button>
                </div>
              </form>
            </div>

            {!signup ? (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Do Not Have a Account?
                    <span
                      className="link-success"
                      onClick={() => setSignup(true)}
                      style={{
                        textDecoration: "none",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                    >
                      SignUp
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already Have An Account?
                    <span
                      onClick={() => setSignup(false)}
                      className="link-danger"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "#298af2",
                        marginLeft: "10px",
                      }}
                    >
                      SignIn
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;

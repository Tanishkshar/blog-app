import "./App.css";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Details from "./pages/Details";
import AddUpdate from "./pages/AddUpdate";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import "./responsive.css";
import { useEffect, useState } from "react";
import Authentication from "./pages/Authentication";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const navi = useNavigate();
  const handlelogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navi("/auth");
    });
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Header
        setActive={setActive}
        handlelogout={handlelogout}
        active={active}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user} />} />
        <Route
          path="/Details/:id"
          element={<Details setActive={setActive} user={user} />}
        />
        <Route
          path="/create"
          element={
            user?.uid ? (
              <AddUpdate setActive={setActive} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? (
              <AddUpdate user={user} setActive={setActive} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/auth"
          element={<Authentication setActive={setActive} />}
        />
      </Routes>
    </div>
  );
}

export default App;

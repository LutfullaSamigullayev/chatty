import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/home/home";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogged, setIsLoged] = useState(false);
  let auth = getAuth();

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoged(true);
      } else {
        setIsLoged(false);
      }
    });
    return findOut;
  }, [auth]);
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLogged ? "/home" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={isLogged ? <Home /> : <Navigate to="/login" />}
      />
      {/* 404 fallback */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/home/home";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { get, ref, update, onDisconnect } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userSlice";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = ref(db, "users/" + currentUser.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // 🔹 Reduxga user yozish
          dispatch(
            setUser({
              uid: currentUser.uid,
              email: currentUser.email || "",
              displayName: data.displayName || "",
              photoURL: data.photoURL || "",
              bio: data.bio || "",
            })
          );

          // 🔹 Presence ni online qilish
          const presenceRef = ref(db, "presence/" + currentUser.uid);
          await update(presenceRef, {
            state: "online",
            lastChanged: Date.now(),
          });
          onDisconnect(presenceRef).update({
            state: "offline",
            lastChanged: Date.now(),
          });
        }
      } else {
        // 🔹 Agar foydalanuvchi bo‘lmasa
        dispatch(clearUser());
      }
    });

    return () => unsubcribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user.uid ? "/home" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={user.uid ? <Home /> : <Navigate to="/login" />}
      />
      {/* 404 fallback */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;

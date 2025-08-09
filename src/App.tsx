import { useEffect } from "react";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/home/home";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { get, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userSlice";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
      if(currentUser) {
        const userRef = ref(db, 'users/' + currentUser.uid)
        const snapshot = await get(userRef)

        if(snapshot.exists()) {
          const data = snapshot.val()

          dispatch(setUser({
            uid: currentUser.uid,
            email: currentUser.email || '',
            username: data.username || '',
            photoURL: data.photoURL || '',
            bio: data.bio || '',
          }))
        }
        else {
          dispatch(clearUser())
        }
      }
    })
    
    return () => unsubcribe()
  }, [dispatch])


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

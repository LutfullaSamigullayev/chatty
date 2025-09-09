import { signInWithPopup } from "firebase/auth";
import { Icons } from "../../../icons";
import "./authStyles.css";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../../firebase/config";
import { get, ref, set, update } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";

export function GoogleBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // 🔹 yangi foydalanuvchi bo‘lsa — DBga saqlash
        await set(userRef, {
          email: user.email,
          displayName: user.displayName || "No Name",
          photoURL: user.photoURL || "",
          bio: "",
        });
      }

      // 🔹 presence tuguni yaratish/yangilash
      const presenceRef = ref(db, "presence/" + user.uid);
      await update(presenceRef, {
        state: "online",
        lastChanged: Date.now(),
      });

      // 🔹 Redux store’ga yozish
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "No Name",
          photoURL: user.photoURL || "",
          bio: "",
        })
      );

      navigate("/home");
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="auth-btn google">
      <Icons.google />
      Log In with Google
    </button>
  );
}

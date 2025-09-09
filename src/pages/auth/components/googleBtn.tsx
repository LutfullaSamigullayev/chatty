import { signInWithPopup } from "firebase/auth";
import { Icons } from "../../../icons";
import "./authStyles.css";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../../firebase/config";
import { get, ref, set } from "firebase/database";

export function GoogleBtn() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userRef = ref(db, 'users/' + user.uid)
      const snapshot = await get(userRef)

      if(!snapshot.exists()) {
        await set(userRef, {
          email: user.email,
          username: user.displayName || 'No Name',
          photoURL: user.photoURL || '',
          bio: '',
        })
      }
      navigate('/home')
    } catch(error) {
      console.log("Google login error:", error)
    }
  }
  return (  
    <button onClick={handleGoogleLogin} className="auth-btn google">
      <Icons.google />
      Log In with Google
    </button>
  );
}

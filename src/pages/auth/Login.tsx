import { useState } from "react";
import {
  EmailInput,
  GoogleBtn,
  LeftBox,
  PasswordInput,
  SubmitBtn,
} from "./components";
import "./components/authStyles.css";
import { validateEmail, validatePassword } from "./components/validation";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { Logo } from "./components/logo";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Realtime Database’dan user ma’lumotini olish
          const userSnap = await get(ref(db, "users/" + user.uid));
          if (userSnap.exists()) {
            const userData = userSnap.val();
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email || "",
                displayName: userData.displayName || "",
                photoURL: userData.photoURL || "",
                bio: userData.bio || "",
              })
            );
          }

          // Presence → online qilish
          const presenceRef = ref(db, "presence/" + user.uid);
          update(presenceRef, {
            state: "online",
            lastChanged: Date.now(),
          });

          navigate("/home");
        })
        .catch(() => setSubmitError(true));
    }
  };

  return (
    <div className="auth-wrapper">
      <LeftBox />
      <div className="auth-right-wrapper">
        <div className="auth-logo-box">
          <Logo />
        </div>
        <div className="form-box">
          <h1 className="form-title">
            Welcome back to the CodeSquid Community
          </h1>

          <GoogleBtn />

          <form className="auth-form" onSubmit={handleSubmit}>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              onBlur={() => setEmailError(validateEmail(email))}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              onBlur={() => setPasswordError(validatePassword(password))}
            />

            <SubmitBtn title="login" />
            {submitError ? (
              <p className="submit-error-text">Incorrect email or password.</p>
            ) : (
              <p></p>
            )}
          </form>

          <p className="form-link">
            No Account yet?{" "}
            <a href="/register">
              <b>SIGN UP</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

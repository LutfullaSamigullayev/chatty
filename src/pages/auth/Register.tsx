import { useState } from "react";
import {
  EmailInput,
  GoogleBtn,
  LeftBox,
  PasswordInput,
  SubmitBtn,
  UserNameInput,
} from "./components";
import "./components/authStyles.css";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./components/validation";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { Logo } from "./components/logo";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameErr = validateUsername(username)
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setUsernameError(usernameErr)
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!usernameErr && !emailErr && !passwordErr) {
      createUserWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // Realtime DB ga foydalanuvchi saqlash
    const userRef = ref(db, "users/" + user.uid);
    return set(userRef, {
      email: user.email,
      displayName: username,   // 🔹 username emas, displayName
      photoURL: ""
    }).then(() => {
      // Presence tuguniga ham yozamiz
      const presenceRef = ref(db, "presence/" + user.uid);
      set(presenceRef, {
        state: "offline",
        lastChanged: Date.now()
      });

      // Reduxga yozish
      dispatch(setUser({
        uid: user.uid,
        email: user.email || "",
        displayName: username,  // 🔹
        photoURL: "",
        bio: ""
      }));
    });
  })
  .then(() => navigate("/home"))
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
            Join & Connect the Fastest Growing Online Community
          </h1>
          <GoogleBtn />
          <form className="auth-form" onSubmit={handleSubmit}>
            <UserNameInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              onBlur={() => setUsernameError(validateUsername(username))}
            />
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
            <SubmitBtn title="register" />
            {submitError ? (
              <p className="submit-error-text">Incorrect email or password.</p>
            ) : (
              <p></p>
            )}
          </form>
          <p className="form-link">
            Own an Account?{" "}
            <a href="/login">
              <b>JUMP RIGHT IN</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

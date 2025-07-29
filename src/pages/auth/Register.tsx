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
import { validateEmail, validatePassword } from "./components/validation";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export function Register() {
  const navigate = useNavigate();

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
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => navigate("/home"))
        .catch(() => setSubmitError(true));
    }
  };

  return (
    <div className="auth-wrapper">
      <LeftBox />
      <div className="auth-right-wrapper">
        <div className="form-box">
          <h1 className="form-title">
            Join & Connect the Fastest Growing Online Community
          </h1>
          <GoogleBtn />
          <form className="auth-form" onSubmit={handleSubmit}>
            <UserNameInput />
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

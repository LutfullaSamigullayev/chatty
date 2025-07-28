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

export function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      console.log("Login with:", { email, password });
      // Bu yerda API chaqiruv yoki auth logic yozilishi mumkin
    }
  };

  return (
    <div className="auth-wrapper">
      <LeftBox />
      <div className="auth-right-wrapper">
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
          </form>

          <p className="form-link">
            Own an Account?{" "}
            <a href="#">
              <b>JUMP RIGHT IN</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

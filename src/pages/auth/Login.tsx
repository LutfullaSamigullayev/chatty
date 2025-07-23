import { EmailInput, GoogleBtn, PasswordInput, SubmitBtn } from "./components";
import "./components/authStyles.css";

export function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Welcome back to the CodeSquid Community</h1>
        <GoogleBtn />
        <form className="login-form">
          <EmailInput />
          <PasswordInput />
          <SubmitBtn title="login" />
        </form>
        <p className="link-register">
          Own an Account?{" "}
          <a href="#">
            <b>JUMP RIGHT IN</b>
          </a>
        </p>
      </div>
    </div>
  );
}

import { EmailInput, GoogleBtn, PasswordInput, SubmitBtn, UserNameInput } from "./components";
import "./components/authStyles.css";

export function Register() {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Join & Connect the Fastest Growing Online Community</h1>
        <GoogleBtn />
        <form className="login-form">
          <UserNameInput />
          <EmailInput />
          <PasswordInput />
          <SubmitBtn title="register" />
        </form>
        <p className="link-login">
          Own an Account?{" "}
          <a href="#">
            <b>JUMP RIGHT IN</b>
          </a>
        </p>
      </div>
    </div>
  );
}

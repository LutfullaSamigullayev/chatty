import {
  EmailInput,
  GoogleBtn,
  LeftBox,
  PasswordInput,
  SubmitBtn,
} from "./components";
import "./components/authStyles.css";

export function Login() {
  return (
    <div className="auth-wrapper">
      <LeftBox />
      <div className="auth-right-wrapper">
        <div className="form-box">
          <h1 className="form-title">
            Welcome back to the CodeSquid Community
          </h1>
          <GoogleBtn />
          <form className="auth-form">
            <EmailInput />
            <PasswordInput />
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

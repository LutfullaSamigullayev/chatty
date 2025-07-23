import {
  EmailInput,
  GoogleBtn,
  LeftBox,
  PasswordInput,
  SubmitBtn,
  UserNameInput,
} from "./components";
import "./components/authStyles.css";

export function Register() {
  return (
    <div className="auth-wrapper">
      <LeftBox />
      <div className="auth-right-wrapper">
        <div className="form-box">
          <h1 className="form-title">
            Join & Connect the Fastest Growing Online Community
          </h1>
          <GoogleBtn />
          <form className="auth-form">
            <UserNameInput />
            <EmailInput />
            <PasswordInput />
            <SubmitBtn title="register" />
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

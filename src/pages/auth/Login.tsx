import { Icons } from "../../icons";
import './login.css';

export function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Welcome back to the CodeSquid Community</h1>
        <button className="login-btn google">
          <Icons.google />
          Log In with Google
        </button>
        <form className="login-form">
    <div className="line-bottom">
          <label className="login-form-label" htmlFor="username">Email or Username</label>
          <input className="login-form-input"
            type="text"
            id="username"
            name="username"
            placeholder="Email or Username"
          />

    </div>
          {/* <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Pochta manzilingizni kiriting" /> */}
          <div className="line-bottom">
          <label className="login-form-label" htmlFor="password">Password</label>
          <div className="login-password">
            <input className="login-form-input" type="password" id="password" name="password" />
            <button className="login-btn-eye" type="button" aria-label="Toggle password visibility">
              <Icons.eyeOpen />
            </button>
          </div>
          </div>
          <button className="login-btn-submit" type="submit">LOG IN</button>
        </form>
          <p className="link-register">Own an Account? <a href="#"><b>JUMP RIGHT IN</b></a></p>
      </div>
    </div>
  );
}

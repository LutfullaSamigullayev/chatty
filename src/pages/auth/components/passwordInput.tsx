import { Icons } from "../../../icons";
import "./authStyles.css";

export function PasswordInput() {
  return (
    <div className="line-bottom">
      <label className="login-form-label" htmlFor="password">
        Password
      </label>
      <div className="login-password">
        <input
          className="login-form-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="login-btn-eye"
          type="button"
          aria-label="Toggle password visibility"
        >
          <Icons.eyeOpen />
        </button>
      </div>
    </div>
  );
}

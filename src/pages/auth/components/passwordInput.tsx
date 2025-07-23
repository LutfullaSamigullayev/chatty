import { Icons } from "../../../icons";
import "./authStyles.css";

export function PasswordInput() {
  return (
    <div className="line-bottom">
      <label className="auth-form-label" htmlFor="password">
        Password
      </label>
      <div className="form-password">
        <input
          className="auth-form-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="password-btn-eye"
          type="button"
          aria-label="Toggle password visibility"
        >
          <Icons.eyeOpen />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Icons } from "../../../icons";
import "./authStyles.css";
import { inputPropsType } from "../../../types";

export function PasswordInput({
  value,
  onChange,
  onBlur,
  error,
}: inputPropsType) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`line-bottom ${error ? "input-error" : ""}`}>
      <label className="auth-form-label" htmlFor="password">
        Password
      </label>
      <div className="form-password">
        <input
          className="auth-form-input"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          className="password-btn-eye"
          type="button"
          aria-label="Toggle password visibility"
          onClick={toggleShowPassword}
        >
          {showPassword ? <Icons.eyeClose /> : <Icons.eyeOpen />}
        </button>
      </div>
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

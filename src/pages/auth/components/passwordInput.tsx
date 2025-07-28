import { useState } from "react";
import { Icons } from "../../../icons";
import "./authStyles.css";

export function PasswordInput() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError(validatePassword(e.target.value));
    }
  };

  const handleBlur = () => {
    setError(validatePassword(password));
  };

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
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
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
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

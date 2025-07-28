import "./authStyles.css";
import { inputPropsType } from "../../../types";

export function EmailInput({ value, onChange, onBlur, error }: inputPropsType) {
  return (
    <div className={`line-bottom ${error ? "input-error" : ""}`}>
      <label className="auth-form-label" htmlFor="email">
        Email
      </label>
      <input
        className="auth-form-input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

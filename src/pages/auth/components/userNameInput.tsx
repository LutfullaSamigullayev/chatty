import { inputPropsType } from "../../../types";
import "./authStyles.css";

export function UserNameInput({value, onChange, onBlur, error}: inputPropsType) {
  return (
    <div className={`line-bottom ${error ? 'input-error' : ''}`}>
      <label className="auth-form-label" htmlFor="username">
        Username
      </label>
      <input
        className="auth-form-input"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

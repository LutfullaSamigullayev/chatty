import { authPage } from "../../../types";
import './authStyles.css'

export function EmailInput({page}: authPage) {
  return (
    <div className="line-bottom">
      <label className="login-form-label" htmlFor="username">
        {page == 'login' ? 'Email or Username': 'Username'}
      </label>
      <input
        className="login-form-input"
        type="text"
        id="username"
        name="username"
        placeholder="Email or Username"
      />
    </div>
  );
}

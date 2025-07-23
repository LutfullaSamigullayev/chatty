import "./authStyles.css";

export function EmailInput() {
  return (
    <div className="line-bottom">
      <label className="login-form-label" htmlFor="email">
        Email
      </label>
      <input
        className="login-form-input"
        type='email'
        id="email"
        name="email"
        placeholder="Email"
      />
    </div>
  );
}

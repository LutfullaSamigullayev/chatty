import "./authStyles.css";

export function EmailInput() {
  return (
    <div className="line-bottom">
      <label className="auth-form-label" htmlFor="email">
        Email
      </label>
      <input
        className="auth-form-input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
      />
    </div>
  );
}

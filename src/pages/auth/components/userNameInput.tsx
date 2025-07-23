import "./authStyles.css";

export function UserNameInput() {
  return (
    <div className="line-bottom">
      <label className="auth-form-label" htmlFor="username">
        Username
      </label>
      <input
        className="auth-form-input"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
      />
    </div>
  );
}

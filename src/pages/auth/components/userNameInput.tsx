import "./authStyles.css";

export function UserNameInput() {
  return (
    <div className="line-bottom">
      <label className="login-form-label" htmlFor="username">
        Username
      </label>
      <input
        className="login-form-input"
        type='text'
        id="username"
        name="username"
        placeholder="Username"
      />
    </div>
  );
}

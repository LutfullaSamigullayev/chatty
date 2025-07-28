import { useState } from "react";
import "./authStyles.css";

export function EmailInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    const pattern = /^[\w.-]+@(gmail\.com|mail\.ru)$/;
    if (!pattern.test(value)) {
      return "Please enter a valid email ending with @gmail.com or @mail.ru.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(validateEmail(e.target.value));
    }
  };

  const handleBlur = () => {
    setError(validateEmail(email));
  };

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
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

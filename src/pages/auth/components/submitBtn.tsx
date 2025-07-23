import { authSubmit } from "../../../types";
import "./authStyles.css";

export function SubmitBtn({ title }: authSubmit) {
  return (
    <button className="login-btn-submit" type="submit">
      {title == "login" ? "LOG IN" : "SIGN UP"}
    </button>
  );
}

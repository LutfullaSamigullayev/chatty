import { Icons } from "../../../icons";

export function LeftBox() {
  return (
    <div className="auth-left-wrapper">
      <div className="auth-logo">
        <Icons.logo />
        <h1 className="auth-logo-title">CodeSquid</h1>
      </div>
      <img className="auth-left-img" src="/center.png" alt="chatImage" />
      <div className="auth-left-content">
        <h2>Online Community For Front-end Developers</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun.
        </p>
      </div>
    </div>
  );
}

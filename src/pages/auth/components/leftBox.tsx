import { Icons } from "../../../icons";

export function leftBox() {
  return (
    <div className="leftBox-wrapper">
      <div className="logo">
        <Icons.logo />
        <h1>CodeSquid</h1>
      </div>
      <img className="leftBox-img" src="/center.png" alt="chatImage" />
      <div className="leftBox-content">
        <h2>Online Community For Front-end Developers</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun.
        </p>
      </div>
    </div>
  );
}

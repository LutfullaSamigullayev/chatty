import { userContactType } from "../../../types";
import { UserImg } from "./userImg";
import "./userContact.css";

export function UserContact({
  userImgUrl,
  userName,
  massage,
  massageCount,
  time,
  isActive,
}: userContactType) {
  return (
    <div className="contact-box">
      <UserImg src={userImgUrl} alt={userName} size={49} isActive={isActive} />
      <div className="contact-context">
        <h3 className="contact-name">{userName}</h3>
        <div className="contact-massege-box">
          <p className="contact-massage">{massage}</p>
          <p>{time}</p>
        </div>
      </div>
      <span className="contact-massage-count">{massageCount}</span>
    </div>
  );
}


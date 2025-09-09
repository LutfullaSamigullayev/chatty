import { userContactType } from "../../../types";
import { UserImg } from "./userImg";
import "./userContact.css";

export function UserContact({
  userImgUrl,
  userName,
  massage,
  massageCount,
  size,
  time,
  isActive,
  gap,
  activeDotTop,
}: userContactType) {
  return (
    <div className={`contact-box ${gap ? "contact-box-gap" : ""}`}>
      <UserImg
        src={userImgUrl}
        alt={userName}
        size={size}
        isActive={isActive}
        activeDotTop={activeDotTop}
      />
      <div className={`contact-context ${gap ? "contact-context-gap" : ""}`}>
        <h3 className="contact-name">{userName}</h3>

        {/* 🔹 faqat massage yoki time bo‘lsa chiqadi */}
        {(massage || time) && (
          <div className="contact-massege-box">
            {massage && <p className="contact-massage">{massage}</p>}
            {time && <p>{time}</p>}
          </div>
        )}
      </div>

      {/* 🔹 faqat unreadCount > 0 bo‘lsa chiqadi */}
      {massageCount && massageCount > 0 && (
        <span className="contact-massage-count">{massageCount}</span>
      )}
    </div>
  );
}

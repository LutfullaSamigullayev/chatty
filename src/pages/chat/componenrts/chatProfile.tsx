import { UserImg } from "./userImg";
import "./chatProfileStyle.css";
import { ChatProfileType } from "@/types";
import { Icons } from "@/icons";

export function ChatProfile({
  username,
  lastTime,
  src,
  size,
  isActive,
  activeDotTop,
  backToContact
}: ChatProfileType) {
  return (
    <div className="chat-profile-wrapper">
      <button className="back-contact-btn" onClick={() => backToContact()}>
        <Icons.back />
      </button>
      <div className="user-contact-profile">
        <UserImg
          src={src}
          alt={username} // fallback sifatida username ishlatyapmiz
          size={size}
          isActive={isActive}
          activeDotTop={activeDotTop}
        />

        <div className="contact-profile-context">
          <p className="contact-profile-name">{username}</p>

          {/* 🔹 lastTime faqat mavjud bo‘lsa chiqariladi */}
          {lastTime && <span className="profile-last-time">{lastTime}</span>}
        </div>
      </div>
    </div>
  );
}

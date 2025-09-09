import { UserImg } from "./userImg";
import "./chatProfileStyle.css";
import { ChatProfileType } from "@/types";

export function ChatProfile({
  username,
  lastTime,
  src,
  size,
  isActive,
  activeDotTop,
}: ChatProfileType) {
  return (
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
  );
}

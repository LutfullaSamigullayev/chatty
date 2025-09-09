import { userImg } from "../../../types";
import "./userImgStyle.css";

export function UserImg({ src, alt, size, isActive, activeDotTop }: userImg) {
  const sizeClass = `user-img-${size}`;
  const fallbackLetter = alt?.charAt(0)?.toUpperCase() ?? "?";

  const hasImage = src && src.trim() !== "";

  return (
    <div className="user-img-wrapper">
      {hasImage ? (
        <img src={src} alt={alt} className={`user-img ${sizeClass}`} />
      ) : (
        <div className={`username-img ${sizeClass}`}>
          {fallbackLetter}
        </div>
      )}

      {isActive && (
        <span
          className={`user-img-active-dot ${
            activeDotTop ? "user-img-active-dot-top" : ""
          }`}
        ></span>
      )}
    </div>
  );
}

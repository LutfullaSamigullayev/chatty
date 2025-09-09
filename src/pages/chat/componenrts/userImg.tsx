import { userImg } from "../../../types";
import "./userImgStyle.css";

export function UserImg({ src, alt, size, isActive, activeDotTop }: userImg) {
  const sizeClass = `user-img-${size}`;
  return (
    <div className="user-img-wrapper">
      {src ? (
        <img src={src} alt={alt} className={`user-img ${sizeClass}`} />
      ) : (
        <div className={`username-img ${sizeClass}`}>
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
      {isActive && (
        <span
          className={`user-img-active-dot ${
            activeDotTop && "user-img-active-dot-top"
          }`}
        ></span>
      )}
    </div>
  );
}

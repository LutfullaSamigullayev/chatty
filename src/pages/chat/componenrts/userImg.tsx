import { userImg } from "../../../types";
import './userImgStyle.css'

export function UserImg({src, alt, size, isActive}: userImg) {
  const sizeClass = `user-img-${size}`;
  return (
    <div className="user-img-wrapper">
      <img src={src} alt={alt} className={`user-img ${sizeClass}`}/>
      {isActive && <span className="user-img-active-dot"></span>}
    </div>
  )
}

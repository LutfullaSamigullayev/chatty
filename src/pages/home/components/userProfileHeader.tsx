import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import './userProfileHeader.css'

export function UserProfileHeader() {
 
  const {displayName, photoURL} = useSelector((state: RootState) => state.user);
  return (
    <button className="user-profile">
      {photoURL ? (
        <img
          className="user-profile-img"
          src={photoURL}
          alt={displayName || "avatar"} 
        />
      ) : (
        <div className="user-profile-img default-img">
          {displayName && displayName.charAt(0).toUpperCase()}
        </div>
      )}
      {displayName}
    </button>
  );
}

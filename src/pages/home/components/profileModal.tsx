import { useState } from "react";
import "./profileModalStyle.css";
import { Icons } from "../../../icons";

export function ProfileModal() {
  const [edit, setEdit] = useState(false);
  return (
    <div className="profile-modal-wrapper">
      <div className="profile-box">
        <div className="profile-box-img">
          <img src="/users/user5.jpg" alt="user" />
          <button type="button" className="profile-edit-img">
            <Icons.edit />
          </button>
        </div>
        <div className="profile-box-content">
          <form className="profile-form">
            <label htmlFor="username">Username</label>
            {/* <input type="text" name="username"/> */}
            <div className="profile-form-text">
              <span>Lutfulla</span>
              <button type="button" className="profile-edit-text">
                <Icons.edit2 />
              </button>
            </div>
            <label htmlFor="bio">Info</label>
            {/* <input type="text" name="bio"/> */}
            <div className="profile-form-text">
              <span>About us</span>
              <button type="button" className="profile-edit-text">
                <Icons.edit2 />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

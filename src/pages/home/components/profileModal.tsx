import "./profileModalStyle.css";

export function ProfileModal() {
  return (
    <div className="profile-modal-wrapper">
      <div className="profile-box">
        <div className="profile-box-img">
          <img src="/users/user5.jpg" alt="user" />
        </div>
        <div className="profile-box-content">
          <form className="profile-form">
            <label htmlFor="username">Username</label>
            <input type="text" name="username"/>
            <span>Lutfulla</span>
            <label htmlFor="bio">Info</label>
            <input type="text" name="bio"/>
            <span>About us</span>
          </form>
        </div>
      </div>
    </div>
  );
}

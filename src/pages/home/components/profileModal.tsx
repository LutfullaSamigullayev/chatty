import "./profileModalStyle.css";

export function ProfileModal() {
  return (
    <div className="profile-modal-wrapper">
      <div className="profile-box">
        <div className="profile-box-img">
          <img src="/users/user5.jpg" alt="user" />
          <div className="profile-box-username">Username</div>
        </div>
      </div>
    </div>
  );
}

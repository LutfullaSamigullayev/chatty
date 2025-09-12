import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../icons";
import { Chat } from "../chat/chat";
import "./components/homeStyles.css";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/slices/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
// import { ProfileModal } from "./components/profileModal";

export function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  return (
    <div className="home-wrapper">
      <header className="header">
        <div className="logo">
          <Icons.logo />
          <h1 className="logo-title">Chatty</h1>
        </div>
        <div className="header-actions">
          <button className="user-profile">
            {user.photoURL ? (
              <img
                className="user-profile-img"
                src={user.photoURL}
                alt="user-profile"
              />
            ) : (
              <div className="user-profile-img default-img">
                {user.displayName && user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            {user.displayName}
          </button>
          <button onClick={handleLogout} className="btn-logOut">
            Log Out
          </button>
        </div>
      </header>
      <div className="main-wrapper">
        <Chat />

        {/* <ProfileModal /> */}
      </div>
    </div>
  );
}

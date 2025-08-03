import { getAuth, signOut } from "firebase/auth";
import { Icons } from "../../icons";
import { Chat } from "../chat/chat";
import "./components/homeStyles.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(getAuth())
      .then(() => navigate("/login"))
      .catch((e) => console.log(e.error));
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
        <img className="user-profile-img" src="/users/user1.jpg" alt="user" />
        
         {/* <div className="user-profile-img default-img">
          L
         </div> */}
        Username
        </button>
        <button onClick={handleLogOut} className="btn-logOut">
          Log Out
        </button>
        </div>
      </header>
      <div className="main-wrapper">
        <Chat />
      </div>
    </div>
  );
}

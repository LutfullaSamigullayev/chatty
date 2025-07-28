import { getAuth, signOut } from "firebase/auth";
import { Icons } from "../../icons";
import { Chat } from "../chat/chat";
import "./components/homeStyles.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(getAuth())
      .then(() => navigate("/home"))
      .catch((e) => console.log(e.error));
  };
  
  return (
    <div className="home-wrapper">
      <header className="header">
        <div className="logo">
          <Icons.logo />
          <h1 className="logo-title">Chatty</h1>
        </div>
        <button onClick={handleLogOut} className="btn-logOut">
          Log Out
        </button>
      </header>
      <div className="main-wrapper">
        <Chat />
      </div>
    </div>
  );
}

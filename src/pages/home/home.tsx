import { Icons } from "../../icons";
import { Chat } from "../chat/chat";
import "./components/homeStyles.css";


export function Home() {
  return (
    <div className="home-wrapper">
        <header className="header">
            <div className="logo">
                <Icons.logo />
                <h1 className="logo-title">Chatty</h1>
            </div>
            <button className="btn-logOut">Log Out</button>
        </header>
        <div className="main-wrapper">
            <Chat />
        </div>
    </div>
  )
}

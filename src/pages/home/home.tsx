import { useState } from "react";
import { Header, MenuModal } from "./components";
import "./components/homeStyles.css";
import { Chat } from "../chat/chat";

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="home-wrapper">
      <Header onMenuToggle={() => setMenuOpen(true)} />
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main-wrapper">

        <Chat />
        
        {/* <ProfileModal /> */}
      </div>
    </div>
  );
}

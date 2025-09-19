import { useState } from "react";
import { Icons } from "@/icons";
import { UserProfileHeader } from "./userProfileHeader";
import { LogoutBtn } from "./logoutBtn";
import { HeaderSearch } from "./headerSearch";
import "./headerStyle.css";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <header className="header-wrapper">
      <div className="header-left">
        <button className="header-menu" onClick={onMenuToggle}>
          <Icons.burgerMenu />
        </button>
        <div className="header-logo">
          <div className="header-logo-svg">
            <Icons.logo />
          </div>
          <h1 className="header-logo-title">Chatty</h1>
        </div>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <UserProfileHeader />
          <LogoutBtn />
        </div>
        <div className="header-search">
          <HeaderSearch onSearch={setSearch} />
        </div>
      </div>
    </header>
  );
}

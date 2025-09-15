import { Icons } from "@/icons";
import { LogoutBtn } from "./logoutBtn";
import "./menuModalStyle.css";
import { UserProfileHeader } from "./userProfileHeader";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

export function MenuModal({ open, onClose }: MenuModalProps) {
  if (!open) return null;
  return (
    <div
      className={`menu-modal-wrapper ${open ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="menu-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="menu-modal-top">
          <UserProfileHeader />
          <button className="menu-modal-closeBtn" onClick={onClose}>
            <Icons.close />
          </button>
          <hr />
          <div className="menu-modal-list"></div>
        </div>
        <div className="menu-modal-bottom">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}

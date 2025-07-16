import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">Chatty</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/settings">
          <Settings className="w-5 h-5 hover:text-primary" />
        </Link>
        <Link to="/profile">
          <User className="w-5 h-5 hover:text-primary" />
        </Link>
        <button onClick={logout}>
          <LogOut className="w-5 h-5 hover:text-error" />
        </button>
      </div>
    </div>
  );
}

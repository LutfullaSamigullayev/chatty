import { auth } from "@/firebase/config";
import { clearUser } from "@/redux/slices/userSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import "./logoutBtnStyle.css";

export function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };
  return (
    <button onClick={handleLogout} className="btn-logOut">
      Log Out
    </button>
  );
}

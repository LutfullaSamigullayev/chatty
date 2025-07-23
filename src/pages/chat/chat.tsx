import { UserImg } from "./componenrts";
import './componenrts/chatStyle.css'

export function Chat() {
  return (
    <div className="chat-wrapper">
      <UserImg src="/users/user1.jpg" alt="user" size={49} isActive/>
    </div>
  )
}

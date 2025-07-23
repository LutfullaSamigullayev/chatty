import { userContact } from "../../../types";
import { UserImg } from "./userImg";

export  function Contact({userImgUrl, userName, massage, massageCount, time, isActive}: userContact) {
  return (
    <div>
        <div>
          <UserImg src={userImgUrl} alt={userName} size={49} isActive/>
        </div>
        <div>
          <h3>{userName}</h3>
          <p>{massage}</p>
        </div>
        <div> 
            <div>
                <span>{massageCount}</span>
                <p>{time}</p>
            </div>
        </div>
    </div>
  )
}

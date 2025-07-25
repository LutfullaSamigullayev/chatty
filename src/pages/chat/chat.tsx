import { InputSearch, UserContact, UserMassage } from "./componenrts";
import "./componenrts/chatStyle.css";

export function Chat() {
  return (
    <div className="chat-wrapper">
      <div className="contacts-box">
        {/* <InputSearch />
        <UserContact
          userImgUrl="/users/user1.jpg"
          size={49}
          userName="Bill Kuphal"
          massage="The weather will be perfect for the great salom salom"
          time="9:41 AM"
          massageCount={80}
          isActive
        />
        <UserContact
          userImgUrl="/users/user1.jpg"
          size={40}
          userName="Bill Kuphal"
          massage="Online for 10 mins"
          gap
          isActive
          activeDotTop
        /> */}
        <UserMassage
          massage="Roland Barthes"
          time="2:16"
          
        />
        <UserMassage
          massage="What was his vision statement?"
          time="2:18"
          receiver
        />
        <UserMassage
          massage="“Ultimately in order to see a
photograph well, it is best to
look away or close your eyes.”"
          time="2:20"
        />
      </div>
    </div>
  );
}

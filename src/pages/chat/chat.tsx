import { useEffect, useState } from "react";
import { InputSearch, UserContact, UserMessage } from "./componenrts";
import "./componenrts/chatStyle.css";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Icons } from "../../icons";

export function Chat() {
  const [users, setUsers] = useState<any[]>([]);
  const myUser = useSelector((state: RootState) => state.user);
  const [chatContact, setChatContact] = useState<any | null>(null);

  useEffect(() => {
    const userRef = ref(db, "users/");
    const unsubcribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userList = Object.values(data).filter(
          (user: any) => user.email !== myUser.email
        );
        setUsers(userList);
      }
    });

    return () => unsubcribe();
  }, []);

  return (
    <div className="chat-wrapper">
      <div className="contacts-box">
        <div>
          <InputSearch />
        </div>
        <div className="user-contact-list">
          {users.map((user, index) => (
            <div key={index} onClick={() => setChatContact(user)}>
              <UserContact
                key={index}
                userImgUrl={user.photoURL}
                size={49}
                userName={user.username}
                massage="The weather will be perfect for the great salom salom"
                time="9:41 AM"
                massageCount={80}
                isActive
              />
            </div>
          ))}
        </div>
      </div>

      {chatContact ? (
        <div>
          <div className="user-contact-profile">
            <UserContact
              userImgUrl={chatContact.photoURL}
              size={40}
              userName={chatContact.username}
              massage="Online for 10 mins"
              gap
              isActive
              activeDotTop
            />
          </div>
          <div className="chat-box">
            <UserMessage message="Roland Barthes" time="2:16" />
            <UserMessage
              message="What was his vision statement?"
              time="2:18"
              receiver
            />
            <UserMessage
              message="“Ultimately in order to see a
photograph well, it is best to
look away or close your eyes.”"
              time="2:20"
            />
          </div>
          <form className="chat-send-form">
            <input
              className="send-form-input"
              type="text"
              placeholder="Type your message"
            />
            <button className="send-form-btn" type="submit">
              <Icons.send />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

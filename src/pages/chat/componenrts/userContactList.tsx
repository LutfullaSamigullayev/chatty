import { useEffect, useState } from "react";
import { UserContact } from "./userContact";
import { onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { db } from "@/firebase/config";

type ChatContact = {
  id: string;
  username: string;
  photoURL: string;
};

type Props = {
  setChatContact: (contact: ChatContact) => void;
};

export function UserContactList({ setChatContact }: Props) {
  const myUser = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<any[]>([]);

  // 2.1) Kontaktlar ro‘yxatini olish va o‘zimni filtrlash
  useEffect(() => {
    const userRef = ref(db, "users/");
    const unsubcribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userList = Object.entries(data) // [uid, user]
          .filter(([_, user]: any) => user.email !== myUser.email)
          .map(([uid, user]: any) => ({ ...user, uid })); // uid ni qo‘shib qo‘yish
        setUsers(userList);
      }
    });

    return () => unsubcribe();
  }, []);
  return (
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
  );
}

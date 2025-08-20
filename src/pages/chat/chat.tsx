import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatProfile,
  InputSearch,
  UserContact,
  UserMessage,
} from "./componenrts";
import "./componenrts/chatStyle.css";
import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
} from "firebase/database";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Icons } from "../../icons";

type RTDBMessage = {
  sender: string;
  text: string;
  createdAt?: number; // serverTimestamp qo‘yilganda dastlab undefined bo‘lishi mumkin
};

const getChatId = (a: string, b: string) => (a > b ? `${a}_${b}` : `${b}_${a}`);

export function Chat() {
  const [users, setUsers] = useState<any[]>([]);
  const myUser = useSelector((state: RootState) => state.user);
  const [chatContact, setChatContact] = useState<any | null>(null);

  // Xabarlar
  const [messages, setMessages] = useState<RTDBMessage[]>([]);
  const [text, setText] = useState("");

  // Chat scrollni pastga tushirish uchun ref
  const bottomRef = useRef<HTMLDivElement>(null);

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

  // 2.2) Tanlangan kontakt bo‘lsa — shu chatdagi xabarlarni tinglash
  const chatId = useMemo(() => {
    if (!chatContact?.uid || !myUser?.uid) return null;
    return getChatId(myUser.uid, chatContact.uid);
  }, [myUser?.uid, chatContact?.uid]);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }
    // Xabarlarni vaqt bo‘yicha olish
    const messagesRef = query(
      ref(db, `chats/${chatId}/messages`),
      orderByChild("createdAt"),
      limitToLast(200) // oxirgi 200 ta xabar
    );

    const unsubscribe = onValue(messagesRef, (snap) => {
      if (!snap.exists()) {
        setMessages([]);
        return;
      }
      // Snapshot -> massiv
      const arr: RTDBMessage[] = [];
      snap.forEach((child) => {
        arr.push(child.val());
      });
      setMessages(arr);
    });

    return () => unsubscribe();
  }, [chatId]);

  // 2.3) Xabar yuborish
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !chatId || !myUser?.uid) return;
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    push(messagesRef, {
      sender: myUser.uid,
      text: trimmed,
      createdAt: serverTimestamp(), // server vaqti
    });

    // ixtiyoriy: chat meta yangilash (listda ishlatish uchun)
    const metaRef = ref(db, `chats/${chatId}/meta`);
    push(metaRef, {
      lastMessage: trimmed,
      lastTime: serverTimestamp(),
      participants: { [myUser.uid]: true, [chatContact!.uid]: true },
    });

    setText("");
  };

  // 2.4) Har yangi xabar kelganda pastga scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

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

      {/* O‘ng panel: tanlangan chat */}
      {chatContact ? (
        <div className="chat-box-wrapper">
          <ChatProfile
            username={chatContact.username}
            src={chatContact.photoURL}
            size={40}
            alt={chatContact.username}
            lastTime={"Online"}
            isActive
            activeDotTop
          />
          <div className="chat-box">
            {messages.map((m, i) => (
              <UserMessage
                key={i}
                message={m.text}
                time={
                  m.createdAt
                    ? new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "" // serverTimestamp qaytguncha bo‘sh bo‘lishi mumkin
                }
                receiver={m.sender === myUser.uid}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="chat-send-form" onSubmit={handleSendMessage}>
            <input
              className="send-form-input"
              type="text"
              placeholder="Type your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="send-form-btn"
              type="submit"
              disabled={!chatContact}
            >
              <Icons.send />
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-empty">
          <p>Kontakt tanlang va suhbatni boshlang 👋</p>
        </div>
      )}
    </div>
  );
}

// src/pages/chat/Chat.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatProfile,
  InputSearch,
  UserContactList,
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
  update,
  set,
  runTransaction,
} from "firebase/database";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Icons } from "../../icons";

type RTDBMessage = {
  text: string;
  senderId: string;
  createdAt?: number | object;
  status?: Record<string, "sent" | "delivered" | "seen">;
};

const getChatId = (a: string, b: string) => (a > b ? `${a}_${b}` : `${b}_${a}`);

export function Chat() {
  const myUser = useSelector((state: RootState) => state.user);
  const [chatContact, setChatContact] = useState<any | null>(null);

  const [messages, setMessages] = useState<{ id: string; data: RTDBMessage }[]>(
    []
  );
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const chatId = useMemo(() => {
    if (!chatContact?.uid || !myUser?.uid) return null;
    return getChatId(myUser.uid, chatContact.uid);
  }, [myUser?.uid, chatContact?.uid]);

  // 🔹 Xabarlarni olish + delivered status
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const messagesRef = query(
      ref(db, `messages/${chatId}`),
      orderByChild("createdAt"),
      limitToLast(200)
    );

    const unsubscribe = onValue(messagesRef, (snap) => {
      if (!snap.exists()) {
        setMessages([]);
        return;
      }

      const arr: { id: string; data: RTDBMessage }[] = [];
      snap.forEach((child) => {
        const msg = child.val() as RTDBMessage;
        const msgId = child.key as string;

        // Agar bu xabar menga kelgan bo‘lsa va status = sent bo‘lsa → delivered
        if (
          msg.senderId !== myUser.uid &&
          msg.status?.[myUser.uid] === "sent"
        ) {
          update(ref(db, `messages/${chatId}/${msgId}/status`), {
            [myUser.uid]: "delivered",
          });
        }

        arr.push({ id: msgId, data: msg });
      });
      setMessages(arr);
    });

    return () => unsubscribe();
  }, [chatId, myUser.uid]);

  // 🔹 Chat ochilganda unreadCount reset + seen qilish
  useEffect(() => {
    if (chatId && myUser?.uid) {
      // unreadCount ni nolga tushirish
      const unreadRef = ref(
        db,
        `conversations/${chatId}/unreadCount/${myUser.uid}`
      );
      set(unreadRef, 0);

      // kelgan barcha xabarlarni seen qilish
      messages.forEach((m) => {
        if (
          m.data.senderId !== myUser.uid &&
          m.data.status?.[myUser.uid] !== "seen"
        ) {
          update(ref(db, `messages/${chatId}/${m.id}/status`), {
            [myUser.uid]: "seen",
          });
        }
      });
    }
  }, [chatId, myUser?.uid, messages]);

  // 🔹 Xabar yuborish
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !chatId || !myUser?.uid || !chatContact?.uid) return;

    const messagesRef = ref(db, `messages/${chatId}`);
    const newMsgRef = push(messagesRef);

    const newMsg: RTDBMessage = {
      text: trimmed,
      senderId: myUser.uid,
      createdAt: serverTimestamp(),
      status: { [chatContact.uid]: "sent" },
    };

    await update(newMsgRef, newMsg);

    // 🔹 conversations yangilash (transaction orqali)
    const convRef = ref(db, `conversations/${chatId}`);
    await runTransaction(convRef, (conv) => {
      if (conv) {
        conv.lastMessage = trimmed;
        conv.updatedAt = Date.now();
        conv.participants = {
          [myUser.uid]: true,
          [chatContact.uid]: true,
        };
        if (!conv.unreadCount) conv.unreadCount = {};
        // receiver uchun unreadCount ++
        conv.unreadCount[chatContact.uid] =
          (conv.unreadCount[chatContact.uid] || 0) + 1;
        // sender uchun reset
        conv.unreadCount[myUser.uid] = 0;
      } else {
        // Agar conv mavjud bo‘lmasa, yangisini yaratamiz
        conv = {
          lastMessage: trimmed,
          updatedAt: Date.now(),
          participants: {
            [myUser.uid]: true,
            [chatContact.uid]: true,
          },
          unreadCount: {
            [chatContact.uid]: 1,
            [myUser.uid]: 0,
          },
        };
      }
      return conv;
    });

    setText("");
  };

  // 🔹 Scrollni pastga tushirish
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="chat-wrapper">
      <div className="contacts-box">
        <InputSearch />
        <UserContactList setChatContact={setChatContact} />
      </div>

      {chatContact ? (
        <div className="chat-box-wrapper">
          <ChatProfile
            username={chatContact.displayName}
            src={chatContact.photoURL}
            size={40}
            alt={chatContact.displayName}
            lastTime={"Online"}
            isActive
            activeDotTop
          />

          <div className="chat-box">
            {messages.map((m) => (
              <UserMessage
                key={m.id}
                message={m.data.text}
                time={
                  typeof m.data.createdAt === "number"
                    ? new Date(m.data.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "..."
                }
                receiver={m.data.senderId === myUser.uid}
                read={
                  m.data.senderId === myUser.uid &&
                  m.data.status?.[chatContact.uid] === "seen"
                }
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

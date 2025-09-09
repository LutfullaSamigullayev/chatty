// src/components/contacts/UserContactList.tsx
import { useEffect, useState } from "react";
import { UserContact } from "./userContact";
import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  DataSnapshot,
} from "firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { db } from "@/firebase/config";

/** Local types (moslashtirish mumkin) */
type ChatContact = {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
  lastMessage?: string;
  updatedAt?: number;
  unreadCount?: number;
  convId?: string | null;
  isActive?: boolean;
  lastSeen?: number; // 🔹 qo‘shildi
};

type Props = {
  setChatContact: (contact: ChatContact) => void;
};

export function UserContactList({ setChatContact }: Props) {
  const myUid = useSelector((state: RootState) => state.user?.uid) as string;

  const [usersMap, setUsersMap] = useState<Record<string, any>>({});
  const [presenceMap, setPresenceMap] = useState<Record<string, any>>({});
  const [conversationsMap, setConversationsMap] = useState<Record<string, any>>(
    {}
  );
  const [contacts, setContacts] = useState<ChatContact[]>([]);

  // 1) users/ listener
  useEffect(() => {
    const usersRef = ref(db, "users/");
    const unsub = onValue(usersRef, (snap: DataSnapshot) => {
      if (snap.exists()) setUsersMap(snap.val());
      else setUsersMap({});
    });
    return () => unsub();
  }, []);

  // 2) presence/ listener
  useEffect(() => {
    const presenceRef = ref(db, "presence/");
    const unsub = onValue(presenceRef, (snap: DataSnapshot) => {
      if (snap.exists()) setPresenceMap(snap.val());
      else setPresenceMap({});
    });
    return () => unsub();
  }, []);

  // 3) conversations/ listener filtered by myUid (only if we have myUid)
  useEffect(() => {
    if (!myUid) return;

    // query to get conversations where participants/myUid === true
    const convQuery = query(
      ref(db, "conversations/"),
      orderByChild(`participants/${myUid}`),
      equalTo(true)
    );

    const unsub = onValue(convQuery, (snap: DataSnapshot) => {
      if (snap.exists()) setConversationsMap(snap.val());
      else setConversationsMap({});
    });

    return () => unsub();
  }, [myUid]);

  // 4) Build contacts list when any data changes
  useEffect(() => {
    if (!usersMap || Object.keys(usersMap).length === 0) {
      setContacts([]);
      return;
    }

    const list: ChatContact[] = Object.entries(usersMap)
      .filter(([uid]) => uid !== myUid) // filter myself out
      .map(([uid, userData]) => {
        // find conversation (if any) that contains both myUid and this uid
        let convId: string | null = null;
        let convData: any = null;

        for (const [cid, cobj] of Object.entries(conversationsMap || {})) {
          const participants = (cobj as any)?.participants || {};
          // if participants includes both myUid and uid
          if (participants && participants[uid] && participants[myUid]) {
            convId = cid;
            convData = cobj;
            break;
          }
        }

        const lastMessage: string = convData?.lastMessage || "";
        const updatedAt: number = convData?.updatedAt || 0;
        const unreadCount: number =
          (convData?.unreadCount && convData.unreadCount[myUid]) || 0;
        const isActive: boolean = presenceMap?.[uid]?.state === "online";
        const lastSeen: number = presenceMap?.[uid]?.lastSeen || 0;

        return {
          uid,
          displayName: userData?.displayName || userData?.username || "No name",
          photoURL: userData?.photoURL || "",
          email: userData?.email || "",
          lastMessage,
          updatedAt,
          unreadCount,
          convId,
          isActive,
          lastSeen, // 🔹 qo‘shildi
        } as ChatContact;
      });

    // sort: conversations with updatedAt desc first, then alphabetically
    list.sort((a, b) => {
      const at = a.updatedAt || 0;
      const bt = b.updatedAt || 0;
      if (at === bt) {
        return (a.displayName || "").localeCompare(b.displayName || "");
      }
      return bt - at;
    });

    setContacts(list);
  }, [usersMap, conversationsMap, presenceMap, myUid]);

  // small helper to format time
  function formatTime(ts?: number) {
    if (!ts) return "--:--";
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "--:--";
    }
  }

  // Render
  return (
    <div className="user-contact-list">
      {contacts.map((contact) => (
        <div
          key={contact.uid}
          onClick={() =>
            setChatContact({
              uid: contact.uid,
              displayName: contact.displayName,
              photoURL: contact.photoURL,
              email: contact.email,
              convId: contact.convId || undefined,
              isActive: contact.isActive,
              lastSeen: contact.lastSeen, // 🔹 qo‘shildi
            })
          }
        >
          <UserContact
            userImgUrl={contact.photoURL ?? ""}
            size={49}
            userName={contact.displayName}
            massage={contact.lastMessage || undefined} // ✅ faqat bo‘lsa yuboriladi
            time={contact.updatedAt ? formatTime(contact.updatedAt) : undefined} // ✅ vaqt bo‘lmasa null
            massageCount={
              contact.unreadCount && contact.unreadCount > 0
                ? contact.unreadCount
                : undefined
            } // ✅ 0 bo‘lsa yuborilmaydi
            isActive={!!contact.isActive}
          />
        </div>
      ))}
    </div>
  );
}

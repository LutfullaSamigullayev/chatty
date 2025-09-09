// // src/utils/chat.ts
// import {
//   ref,
//   set,
//   update,
//   get,
//   serverTimestamp,
//   push,
// } from "firebase/database";
// import { db } from "@/firebase/config";
// import { User } from "@/types";

// export async function sendMessage(
//   chatId: string,
//   myUser: User,
//   chatContact: User,
//   text: string
// ) {
//   const trimmed = text.trim();
//   if (!trimmed) return;

//   // Xabarni messages tuguniga qo‘shamiz
//   const msgRef = ref(db, `chats/${chatId}/messages`);
//   const newMsgRef = push(msgRef);

//   await set(newMsgRef, {
//     text: trimmed,
//     sender: myUser.uid,
//     createdAt: serverTimestamp(),
//   });

//   // Meta ma’lumotni yangilash
//   const metaRef = ref(db, `chats/${chatId}/meta`);
//   const snapshot = await get(metaRef);

//   if (snapshot.exists()) {
//     // Agar meta mavjud bo‘lsa → update
//     await update(metaRef, {
//       lastMessage: trimmed,
//       lastTime: serverTimestamp(),
//     });
//   } else {
//     // Agar meta hali yo‘q bo‘lsa → set (yaratib qo‘yadi)
//     await set(metaRef, {
//       lastMessage: trimmed,
//       lastTime: serverTimestamp(),
//       participants: {
//         [myUser.uid]: true,
//         [chatContact.uid]: true,
//       },
//     });
//   }
// }

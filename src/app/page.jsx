"use client";

import Login from "@/components/log";
import SignUp from "../components/sign";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebaseconfig";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "chats"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
    });

    return () => unsubscribe();
  }, [msg?.sent]);

  const chat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        id: user.uid,
        name: user.displayName,
        message: message,
      });
      setMessage("");
      setMsg({ sent: "Elküldve" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-2">
      <SignUp />
      <Login />
      <h1>Chat</h1>
      <div className="flex justify-center items-center border w-72 h-fit p-4 flex-col gap-2">
        {chats &&
          chats.map((e) => (
            <div
              key={e.id}
              className={
                e.id == user.uid
                  ? "flex justify-end items-center w-full h-fit p-2"
                  : "flex justify-start items-center w-full h-fit p-2"
              }
            >
              <div className="flex justify-center items-center w-fit h-fit border px-2 flex-col">
                <p>{e.name}</p>
                <p>- {e.message}</p>
              </div>
            </div>
          ))}
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Ide írd..."
            className="border px-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button disabled={!user} className="border px-2" onClick={chat}>
            Küldés
          </button>
        </div>
      </div>
    </div>
  );
}

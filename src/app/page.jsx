"use client";

import Login from "@/components/log";
import SignUp from "../components/sign";
import Chatroom from "../components/chat";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseconfig";

export default function Home() {
  const [authCheck, setAuth] = useState("log");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex min-h-screen relative flex-col justify-center items-center bg-black">
      {!user && (
        <h1 className="text-text absolute top-10 font-bold text-2xl">
          Chatify
        </h1>
      )}
      {!user ? (
        authCheck == "log" ? (
          <Login setAuth={setAuth} />
        ) : (
          <SignUp setAuth={setAuth} />
        )
      ) : (
        <Chatroom user={user} />
      )}
    </div>
  );
}

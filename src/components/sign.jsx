"use client";
import { useState } from "react";
import { auth } from "@/lib/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "sonner";

export default function SignUp({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
      if (email == "" || password == "" || displayName == "")
        toast.error("Missing data!");
      if (email != "" && password != "" && displayName != "")
        toast.error("Password should be minimum 6 characters!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 mx-auto border-3 bg-bg border-border rounded-2xl justify-center items-center p-4"
      >
        <h2 className="text-text text-xl font-bold">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border bg-gray placeholder:text-text text-text border-black rounded-lg text-xl outline-none"
        />
        <input
          type="text"
          placeholder="Nickname"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border bg-gray placeholder:text-text text-text border-black rounded-lg text-xl outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border bg-gray placeholder:text-text text-text border-black rounded-lg text-xl outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-gray text-text font-bold rounded-xl w-fit text-xl cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <p className="text-text">
        Wanna login?{" "}
        <button
          className="font-bold cursor-pointer"
          onClick={() => setAuth("log")}
        >
          Login
        </button>
      </p>
    </>
  );
}

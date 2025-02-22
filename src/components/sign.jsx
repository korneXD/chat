"use client";
import { useState } from "react";
import { auth } from "@/lib/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-row  gap-2">
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" p-2 border"
      />
      <input
        required
        type="text"
        placeholder="Nickname"
        value={displayName}
        onChange={(e) => setName(e.target.value)}
        className=" p-2 border"
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border"
      />
      <button type="submit" className="p-2 bg-black text-white">
        Sign Up
      </button>
    </form>
  );
}

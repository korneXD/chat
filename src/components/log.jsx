"use client";
import { useState } from "react";
import { auth } from "@/lib/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (email == "" && password != "") toast.error("Email required!");
      if (password == "" && email != "") toast.error("Password required!");
      if (email == "" && password == "")
        toast.error("Email and password required!");
    }
    if (email != "" && password != "") toast.error("User does not exist!");
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 mx-auto border-3 bg-bg border-border rounded-2xl justify-center items-center p-4"
      >
        <h2 className="text-text text-xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </button>
      </form>
      <p className="text-text">
        Wanna sign up?{" "}
        <button
          className="font-bold cursor-pointer"
          onClick={() => setAuth("sign")}
        >
          Sign up
        </button>
      </p>
    </>
  );
}

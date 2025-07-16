import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7070/api/auth/sign-up", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // tokenni saqlaymiz
      navigate("/chat"); // ro‘yxatdan o‘tganidan so‘ng chat sahifasiga o‘tamiz
    } catch (error: any) {
      alert(error.response?.data?.message || "Ro‘yxatdan o‘tishda xatolik");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="form-control w-full">
        <span className="label-text">Name</span>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Email</span>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Password</span>
        <input
          type="password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className="btn btn-primary w-full mt-4" type="submit">
        Create Account
      </button>

      <p className="text-sm text-center mt-2">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Log in
        </a>
      </p>
    </form>
  );
}

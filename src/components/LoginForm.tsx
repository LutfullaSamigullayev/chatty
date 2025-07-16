import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7070/api/auth/sign-in", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // tokenni saqlaymiz
      navigate("/chat"); // login muvaffaqiyatli bo‘lsa, chat sahifasiga yo‘naltiramiz
    } catch (error: any) {
      alert(error.response?.data?.message || "Login xatoligi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        Log In
      </button>

      <p className="text-sm text-center mt-2">
        Don't have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Create account
        </a>
      </p>
    </form>
  );
}

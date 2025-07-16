import AuthAside from "@/components/AuthAside";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Chap tomon - register forma */}
      <div className="flex items-center justify-center bg-[#1A103D] p-8">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Create your account</h2>
          <RegisterForm />
        </div>
      </div>

      {/* O‘ng tomon */}
      <AuthAside />
    </div>
  );
}

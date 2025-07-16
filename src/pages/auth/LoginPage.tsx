import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Chap tomon - login forma */}
      <div className="flex items-center justify-center bg-[#1A103D] p-8">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome back 👋</h2>
          <LoginForm />
        </div>
      </div>
      
      {/* O'ng tomon - fon rasmi yoki yozuv */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#170D37] text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Chatty</h1>
        <p className="text-lg text-center max-w-sm">
          Real-time messaging app made simple. Stay connected with your team and friends!
        </p>
      </div>
    </div>
  );
}

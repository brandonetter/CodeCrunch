import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";
export default function SignInSignUp() {
  const [loading, setLoading] = useState(false);
  const setSignIn = () => {
    setLoading(true);
    signIn("github");
  };
  return (
    <div
      className={`w-72 h-96 rounded-xl p-8 bg-card ${loading && "bg-card/90"}`}
    >
      <h1 className="text-xl ">Sign In</h1>
      <button
        disabled={loading}
        className="flex justify-center items-center w-full hover:bg-slate-400/40 bg-[#2b3137] shadow-[inset_0_-2px_10px_0_rgba(0,0,0,0.3)] text-white p-2 rounded-[4px] mt-4"
        onClick={setSignIn}
      >
        {loading ? <Loader className="animate-spin" /> : "Github"}
      </button>
    </div>
  );
}

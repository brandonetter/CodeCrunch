import { signIn } from "next-auth/react";
export default function SignInSignUp() {
  console.log("SignInSignUp");
  return (
    <div className="w-72 h-96 rounded-xl p-4 bg-card">
      <h1>SignInSignUp</h1>
      <button onClick={() => signIn("github")}>Sign in with Google</button>
    </div>
  );
}

import { getUserChallengeCompletions } from "@/lib/actions/challengeruns.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";

import { Flame, CheckCircle2 } from "lucide-react";
export default async function UserStats({ email }: { email: string }) {
  const User = await getUserByEmail(email);
  const completions = await getUserChallengeCompletions(email);
  const baseStatClasses =
    "flex text-xl gap-1 w-full justify-between items-center";
  return (
    <>
      <div className={`${baseStatClasses} text-yellow-600`}>
        <span className="text-yellow-800 text-base">Points</span>
        <span className="flex w-1/4 justify-end gap-2">
          {User?.points} <Flame />
        </span>
      </div>
      <div className={`${baseStatClasses} text-green-600`}>
        <span className="text-green-800 text-base">Completions</span>
        <span className="flex w-1/4 justify-end gap-2">
          {completions.length} <CheckCircle2 />
        </span>
      </div>
    </>
  );
}

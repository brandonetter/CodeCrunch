import { Challenge } from "@prisma/client";
import Pill from "../shared/Pill";
import { Flame } from "lucide-react";
export default function ChallengeStats({
  challenge,
}: {
  challenge: Challenge;
}) {
  const difficulty = ["easy", "medium", "hard"];
  const challengeDifficulty = difficulty[Number(challenge.difficulty) - 1];
  return (
    <div className="py-2 mb-4 flex flex-col gap-y-2">
      <h1>{challenge?.name}</h1>
      <section className="flex gap-2">
        <Pill value={challenge.category!} />
        <Pill className="capitalize" value={challengeDifficulty}>
          {challengeDifficulty}
        </Pill>
      </section>{" "}
      <section className="flex gap-2">
        <Pill value="bounty" className="flex gap-2">
          <span className="flex">
            {challenge.points}
            <Flame size={16} />
          </span>
        </Pill>
      </section>
    </div>
  );
}

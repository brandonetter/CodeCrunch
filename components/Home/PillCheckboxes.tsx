"use client";

import { CheckCircle2, Circle } from "lucide-react";
import Pill from "../shared/Pill";
import { updateURL } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const pills = [
  {
    id: 1,
    value: "easy",
    category: "difficulty",
    className: "bg-green-100 text-green-800",
    border: "border-green-800",
  },
  {
    id: 2,
    value: "medium",
    category: "difficulty",
    className: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-800",
  },
  {
    id: 3,
    value: "hard",
    category: "difficulty",
    className: "bg-red-100 text-red-800",
    border: "border-red-800",
  },
  {
    id: "database",
    value: "Database",
    category: "category",
    className: "bg-blue-100 text-blue-800",
    border: "border-blue-800",
  },
  {
    id: "frontend",
    value: "Frontend",
    category: "category",
    className: "bg-green-100 text-green-800",
    border: "border-green-800",
  },
  {
    id: "backend",
    category: "category",
    value: "Backend",
    className: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-800",
  },
];

export default function PillCheckboxes() {
  const router = useRouter();

  const params = useSearchParams();
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const { param, value } = e.target.dataset;

    updateURL(params, { [param!]: checked ? value! : "" }, router);
  };
  return (
    <article className="flex md:justify-center flex-wrap items-center gap-2">
      {pills.map((pill) => (
        <label key={pill.id} className="cursor-pointer">
          <Pill
            value={pill.id.toString()}
            className={`${pill.border} bg-opacity-50 peer-checked:bg-opacity-100 border border-opacity-65 peer-checked:border-opacity-100`}
          >
            <input
              className="hidden peer"
              type="checkbox"
              data-param={pill.category}
              data-value={pill.id}
              checked={params.get(pill.category) === pill.id.toString()}
              onChange={handleCheckbox}
            ></input>
            <Circle className="peer-checked:hidden w-4" />
            <CheckCircle2 className="hidden peer-checked:flex w-4" />
          </Pill>
        </label>
      ))}
    </article>
  );
}

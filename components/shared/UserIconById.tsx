"use client";
import { getUserIconById } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
export default function UserIconById({
  id,
  username,
  className,
}: {
  id: string;
  username: string;
  className?: string;
}) {
  const [icon, setIcon] = useState<string | null>();
  const [error, setError] = useState(false);
  useEffect(() => {
    // this is cached
    getUserIconById(id).then((icon) => setIcon(icon));
  }, [id]);
  if (!icon)
    return (
      <div
        className={`${className} rounded-full bg-gray-400 animate-pulse`}
      ></div>
    );
  if (error) {
    return (
      <div
        className={`flex items-center rounded-full justify-center bg-slate-800 uppercase`}
      >
        {username[0]}
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <img
        src={icon}
        alt="user icon"
        className={`${className} rounded-full`}
        onError={() => {
          setError(true);
        }}
      />
    </div>
  );
}

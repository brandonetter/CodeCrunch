"use client";

import { getUserIconById } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketProvider";
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
  const { activeUserList } = useSocketContext();
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
    <div className="flex items-center relative">
      <img
        src={icon}
        alt="user icon"
        className={`${className} rounded-full`}
        onError={() => {
          setError(true);
        }}
      />
      {activeUserList.includes(id) ? (
        <div className="w-3 h-3 bg-green-400 rounded-full absolute bottom-0 right-0 border-2 border-card"></div>
      ) : (
        <div className="w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-0 border-2 border-card"></div>
      )}
    </div>
  );
}

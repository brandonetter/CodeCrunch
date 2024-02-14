"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useTransition, useEffect, use } from "react";
import { Button } from "../ui/button";
import { Loader, XCircle } from "lucide-react";
import { updateURL } from "@/lib/utils";
import { usePending } from "@/lib/hooks/usePending";
import PillCheckboxes from "./PillCheckboxes";
import React from "react";

const Searchbar = React.memo(({ promise }: { promise: Promise<any> }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending] = usePending(promise || Promise.resolve());
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("name") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateURL(params, { name: search }, router);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [pending]);

  const resetSearch = () => {
    setSearch("");
    updateURL(params, { name: "" }, router);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-lg:flex-col justify-between"
    >
      <div className="flex">
        <div className="flex relative w-full">
          <input
            ref={inputRef}
            disabled={pending}
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="max-lg:mb-2 border-t-0 border-l-0 border-r-0 border-b-2 border-blue-500/30 focus:outline-none w-full md:w-80 h-10 px-2"
          />
          {search && (
            <XCircle
              className="cursor-pointer absolute right-[5%] mt-2 w-6 text-gray-500 border-t-0 focus:border-blue-500/30 focus:outline-none"
              onClick={resetSearch}
            />
          )}
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="transition-all duration-75"
        >
          <div className="h-10 w-12 flex items-center justify-center">
            {pending ? <Loader className="animate-spin" /> : "Search"}
          </div>
        </Button>
      </div>
      <PillCheckboxes />
    </form>
  );
});

Searchbar.displayName = "Searchbar";
export default Searchbar;

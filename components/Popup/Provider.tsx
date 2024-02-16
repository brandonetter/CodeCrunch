"use client";
import { usePopupStore } from "@/context";
import { FramerPopup } from "../Animations/FramerPopup";
import AnimateHeight from "../Animations/AnimateHeight";

export default function PopupProvider() {
  const { open, setOpen, Component } = usePopupStore();

  const parentClass = open
    ? "bg-black/40"
    : "bg-black/0 user-select-none pointer-events-none";

  return (
    <>
      <div
        className={`${parentClass} transition-all inset-0 fixed z-[150] flex items-center justify-center h-screen `}
      >
        <AnimateHeight className="w-72">
          <FramerPopup>
            {open && (
              <div className="relative flex flex-col justify-center items-center rounded-lg shadow-lg">
                <div className="items-center justify-center flex h-6 w-12 relative self-end bg-neutral-900 right-2 rounded-t-xl">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-2xl text-gray-500"
                  >
                    &times;
                  </button>
                </div>
                <Component />
              </div>
            )}
          </FramerPopup>
        </AnimateHeight>
      </div>
    </>
  );
}

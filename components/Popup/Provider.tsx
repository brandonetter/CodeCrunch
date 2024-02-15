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
        <AnimateHeight className="w-2/3">
          <FramerPopup>
            {open && (
              <div className="relative rounded-lg shadow-lg">
                <div className="flex justify-end">
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

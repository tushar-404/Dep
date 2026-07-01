"use client";

import { useAtom } from "jotai";
import { isUpdateModeAtom } from "../../lib/store";

export default function ModeToggle() {
  const [isUpdateMode, setIsUpdateMode] = useAtom(isUpdateModeAtom);

  const base =
    "px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors duration-150 border";
  const active = "bg-white/[8%] border-white/[10%] text-white";
  const inactive = "bg-transparent border-transparent text-gray-500 hover:text-gray-300";

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setIsUpdateMode(false)}
        className={`${base} ${!isUpdateMode ? active : inactive}`}
      >
        Deploy New
      </button>
      <span className="w-px h-3 bg-white/10" />
      <button
        onClick={() => setIsUpdateMode(true)}
        className={`${base} ${isUpdateMode ? active : inactive}`}
      >
        Update Existing
      </button>
    </div>
  );
}

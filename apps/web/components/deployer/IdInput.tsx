"use client";

import { useAtom, useAtomValue } from "jotai";
import { existingIdAtom, isUpdateModeAtom } from "../../lib/store";

export default function IdInput() {
  const isUpdateMode = useAtomValue(isUpdateModeAtom);
  const [existingId, setExistingId] = useAtom(existingIdAtom);

  if (!isUpdateMode) return null;

  return (
    <input
      type="text"
      placeholder="Page ID (e.g. a1b2c3d4)"
      value={existingId}
      onChange={(e) => setExistingId(e.target.value)}
      className="w-full px-4 py-2.5 bg-white/[4%] border border-white/[8%] rounded-xl text-white text-sm font-sans outline-none transition-all duration-200 placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-blue-500/[4%] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
    />
  );
}

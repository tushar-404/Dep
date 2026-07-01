"use client";

import { useAtomValue } from "jotai";
import {
  fileAtom,
  isUpdateModeAtom,
  existingIdAtom,
  loadingAtom,
} from "../../lib/store";

interface SubmitButtonProps {
  onClick: () => void;
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  const file = useAtomValue(fileAtom);
  const isUpdateMode = useAtomValue(isUpdateModeAtom);
  const existingId = useAtomValue(existingIdAtom);
  const loading = useAtomValue(loadingAtom);

  const isDisabled = !file || loading || (isUpdateMode && !existingId);
  const label = loading
    ? "Deploying…"
    : isUpdateMode
    ? "Update →"
    : "Deploy now →";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "flex items-center gap-2 px-4 py-[7px] rounded-lg text-sm font-semibold font-sans transition-all duration-150",
        isDisabled
          ? "bg-white/[5%] text-gray-600 cursor-not-allowed"
          : "bg-blue-500 text-white cursor-pointer hover:bg-blue-400 active:scale-[0.97] shadow-[0_2px_16px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_24px_rgba(59,130,246,0.5)]",
      ].join(" ")}
    >
      {loading ? (
        <span
          className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"
          aria-hidden="true"
        />
      ) : null}
      {label}
    </button>
  );
}

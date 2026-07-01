"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { deployUrlAtom } from "../../lib/store";

export default function DeployResult() {
  const deployUrl = useAtomValue(deployUrlAtom);
  const [copied, setCopied] = useState(false);

  if (!deployUrl) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(deployUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="animate-fade-up mx-5 mb-5 flex flex-col gap-3 rounded-xl border border-green-500/[18%] bg-green-500/[4%] p-4">
      <div className="flex items-center gap-2">
        <span
          className="w-[6px] h-[6px] rounded-full bg-green-500 flex-shrink-0 animate-pulse-green"
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-green-400">
          Live
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-black/25 border border-white/[5%] px-3 py-2.5">
        <a
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 font-mono text-[0.8125rem] text-green-400 truncate hover:opacity-75 transition-opacity"
        >
          {deployUrl}
        </a>
        <button
          onClick={handleCopy}
          aria-label="Copy URL"
          className={[
            "flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-semibold font-sans cursor-pointer transition-all duration-150 border",
            copied
              ? "text-green-400 border-green-500/25 bg-green-500/10"
              : "text-gray-400 border-white/[8%] bg-white/[4%] hover:text-white hover:bg-white/[8%]",
          ].join(" ")}
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}

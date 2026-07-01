"use client";

import { useAtom } from "jotai";
import { fileAtom } from "../../lib/store";

export default function FileUploader() {
  const [file, setFile] = useAtom(fileAtom);

  return (
    <label className="group block cursor-pointer relative min-h-[100px]">
      <input
        type="file"
        accept=".html"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      <div className="relative flex flex-col items-center justify-center gap-3 py-8 px-5 rounded-xl border border-dashed border-white/[10%] bg-white/[2%] text-center pointer-events-none transition-all duration-200 group-hover:border-blue-500/30 group-hover:bg-blue-500/[3%] group-focus-within:border-blue-500/30">
        {file ? (
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 border border-green-500/25">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm font-medium text-white truncate max-w-[280px]">{file.name}</span>
            <span className="text-xs text-gray-600 flex-shrink-0">ready to deploy</span>
          </div>
        ) : (
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[5%] border border-white/[8%] text-gray-400 transition-all duration-300 ease-spring group-hover:text-blue-400 group-hover:-translate-y-0.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Click to select your HTML file
              </span>
              <span className="text-xs text-gray-600">or drag &amp; drop — .html only</span>
            </div>
          </>
        )}
      </div>
    </label>
  );
}

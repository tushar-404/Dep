"use client";

import { useState } from "react";
import { deployNewPage, updateExistingPage } from "../../lib/api";

export default function DeployerForm() {
  const [file, setFile] = useState<File | null>(null);
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [existingId, setExistingId] = useState("");

  const handleAction = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const htmlContent = await file.text();

      if (isUpdateMode) {
        if (!existingId) {
          console.log("Please enter the ID of the page you want to update.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem(`editToken_${existingId}`);

        if (!token) {
          console.log("No edit token found for this ID");
          setLoading(false);
          return;
        }

        const data = await updateExistingPage(
          existingId,
          htmlContent,
          token
        );

        if (data.success) {
          alert("Page updated successfully!");
          setDeployUrl(`http://localhost:3001/view/${existingId}`);
        } else {
          console.log(data.error || "Update failed");
        }
      } else {
        const data = await deployNewPage(htmlContent);

        if (data.id) {
          localStorage.setItem(`editToken_${data.id}`, data.editToken);
          setDeployUrl(`http://localhost:3001/view/${data.id}`);
        } else {
          alert(data.error || "Deployment failed");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-10 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {isUpdateMode ? "Update Existing Page" : "Deploy New HTML"}
      </h1>

      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setIsUpdateMode(false)}
          className={`rounded-md border px-4 py-2 transition ${
            !isUpdateMode
              ? "border-gray-300 bg-gray-100 font-semibold"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          Deploy New
        </button>

        <button
          onClick={() => setIsUpdateMode(true)}
          className={`rounded-md border px-4 py-2 transition ${
            isUpdateMode
              ? "border-gray-300 bg-gray-100 font-semibold"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          Update Existing
        </button>
      </div>

      <div className="mb-6">
        {isUpdateMode && (
          <input
            type="text"
            placeholder="Enter Page ID (e.g. x7k9p2)"
            value={existingId}
            onChange={(e) => setExistingId(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        )}

        <input
          type="file"
          accept=".html"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full cursor-pointer rounded-md border border-gray-300 p-3 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white hover:file:bg-gray-800"
        />
      </div>

      <button
        onClick={handleAction}
        disabled={!file || loading || (isUpdateMode && !existingId)}
        className={`w-full rounded-md px-5 py-3 text-lg font-semibold text-white transition ${
          !file || loading || (isUpdateMode && !existingId)
            ? "cursor-not-allowed bg-gray-400"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading
          ? "Processing..."
          : isUpdateMode
          ? "Update Page"
          : "Upload & Deploy"}
      </button>

      {deployUrl && (
        <div className="mt-8 rounded-lg border border-blue-500 bg-blue-50 p-5">
          <h3 className="mb-2 text-xl font-semibold text-blue-600">
            Success! 🎉
          </h3>

          <p className="mb-2 text-gray-700">Your page is live at:</p>

          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-semibold text-blue-600 hover:underline"
          >
            {deployUrl}
          </a>
        </div>
      )}
    </div>
  );
}
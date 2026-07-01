"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { deployNewPage, updateExistingPage } from "../../lib/api";
import {
  fileAtom,
  deployUrlAtom,
  loadingAtom,
  isUpdateModeAtom,
  existingIdAtom,
} from "../../lib/store";

import ModeToggle from "./ModeToggle";
import IdInput from "./IdInput";
import FileUploader from "./FileUploader";
import SubmitButton from "./SubmitButton";
import DeployResult from "./DeployResult";

export default function DeployerForm() {
  const file = useAtomValue(fileAtom);
  const isUpdateMode = useAtomValue(isUpdateModeAtom);
  const existingId = useAtomValue(existingIdAtom);
  const [, setDeployUrl] = useAtom(deployUrlAtom);
  const setLoading = useSetAtom(loadingAtom);

  const handleAction = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const htmlContent = await file.text();

      if (isUpdateMode) {
        if (!existingId) {
          console.log("Please enter the ID of the page you want to update.");
          return;
        }
        const token = localStorage.getItem(`editToken_${existingId}`);
        if (!token) {
          console.log("No edit token found for this ID");
          return;
        }
        const data = await updateExistingPage(existingId, htmlContent, token);
        if (data.success) {
          alert("Page updated successfully!");
          setDeployUrl(`${window.location.origin}/view/${existingId}`);
        } else {
          console.log(data.error || "Update failed");
        }
      } else {
        const data = await deployNewPage(htmlContent);
        if (data.id) {
          localStorage.setItem(`editToken_${data.id}`, data.editToken);
          setDeployUrl(`${window.location.origin}/view/${data.id}`);
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
    <div className="card-shimmer relative w-full max-w-[580px] flex flex-col overflow-hidden rounded-2xl border border-white/[7%] bg-[#14151c] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col gap-3 p-5">
        <IdInput />
        <FileUploader />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/[6%] bg-white/[1.5%]">
        <ModeToggle />
        <SubmitButton onClick={handleAction} />
      </div>

      <DeployResult />
    </div>
  );
}
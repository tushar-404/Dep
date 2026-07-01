import { atom } from "jotai";

export const fileAtom = atom<File | null>(null);
export const deployUrlAtom = atom<string | null>(null);
export const loadingAtom = atom<boolean>(false);
export const isUpdateModeAtom = atom<boolean>(false);
export const existingIdAtom = atom<string>("");

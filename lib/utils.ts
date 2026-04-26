import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toRupiah = (number: number) => {
  return "Rp. " + number.toLocaleString('id-ID') + ",-";
}
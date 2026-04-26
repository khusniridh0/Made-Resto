import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toRupiah = (number: number) => {
  return "Rp. " + number.toLocaleString('id-ID') + ",-";
}

export const dateNow = () => {
  const date = new Date();

  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${weekday} ${day} ${month}, ${year}`;
};
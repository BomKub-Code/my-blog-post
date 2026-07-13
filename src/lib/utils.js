import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formInputClass(hasError) {
  return cn(
    'h-11 w-full rounded-lg border bg-(--bg) px-3.5 text-sm text-(--text-h) placeholder:text-(--text) focus:outline-none focus:border-(--text-h)',
    hasError ? 'border-red-400' : 'border-(--border)'
  )
}

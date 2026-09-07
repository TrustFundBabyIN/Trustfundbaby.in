import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initials(value: string) {
  const parts = value.trim().split(/[\s@._-]+/).filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?"
}

/**
 * Only a same-origin relative path is ever allowed through — an untrusted
 * `?redirect=` query param must never be able to send someone off-site after
 * they authenticate.
 */
export function safeRedirectPath(value: string | null | undefined, fallback = "/dashboard") {
  if (!value) return fallback
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return fallback
  }
  return value
}

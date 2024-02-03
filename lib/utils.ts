import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanParams(params: Record<string, any>) {
  for (const key of params.keys()) {
    if (params.get(key) === "") {
      params.delete(key);
    }
  }

  return params;
}

interface URLUpdateOptions {
  [key: string]: string;
}
export function updateURL(
  params: Record<string, any>,
  options: URLUpdateOptions = {},
  router: AppRouterInstance
) {
  const newParams = new URLSearchParams(params);
  for (const key in options) {
    newParams.set(key, options[key]);
  }

  const search = cleanParams(newParams).toString();

  router.push(`?${search}`);
}

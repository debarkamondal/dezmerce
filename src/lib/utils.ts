import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCategories() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`,
    { next: { tags: ["categories"] }, cache: "force-cache" },
  );
  return await res.json();
}
export async function getProductsByCategory(category: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories/${category}`,
    {
      cache: "reload",
    },
  );
  return await res.json();
}
export async function getProductById(id: string) {
  const product = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/products/${id}`,
  );
  return await product.json();
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VariantSelector({
  variants,
}: {
  variants: Array<Array<string>>;
}) {
  const url = usePathname();
  return (
    <div className="my-2 grid grid-cols-3 gap-2 text-center md:grid-cols-4">
      {variants.map((variant, index) => {
        return (
          <span
            key={index}
            className={`border-secondary-foreground rounded-md border p-2 ${url === variant[1] ? "bg-foreground text-background" : ""}`}
          >
            <Link href={variant[1]}>{variant[0]}</Link>
          </span>
        );
      })}
    </div>
  );
}

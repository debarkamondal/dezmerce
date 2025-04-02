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
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 my-2 text-center">
      {variants.map((variant, index) => {
        return (
          <span
            key={index}
            className={`border border-secondary-foreground p-2 rounded-md ${url === variant[1] ? "bg-foreground text-background" : ""}`}
          >
            <Link href={variant[1]}>{variant[0]}</Link>
          </span>
        );
      })}
    </div>
  );
}

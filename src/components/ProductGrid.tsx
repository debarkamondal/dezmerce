import { CartItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
const ProductGrid = (props: {
  products: Omit<CartItem, "qty">[];
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-2 gap-2 lg:gap-4", props.className)}>
      {props.products.map((product, index) => (
        <Link
          href={`/products/${product.id}`}
          key={index}
          className="border-secondary bg-background rounded-md border shadow"
        >
          <Image
            src={product.image}
            height={300}
            width={150}
            alt={"product-thumbnail"}
            className="m-auto size-44 object-scale-down pt-2 md:size-60 lg:size-80"
          />
          <div className="mt-2 rounded-b-md bg-gray-100 p-4">
            <p className="truncate font-semibold">{product.title}</p>
            <span>&#8377;{product.price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductGrid;

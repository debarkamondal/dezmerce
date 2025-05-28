"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "./providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCartContext();
  const totalPrice = cart.reduce((totalPrice, item) => {
    return (totalPrice += item.price * item.qty);
  }, 0);
  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        hidden={!totalPrice || pathname === "/cart"}
        className={`border-secondary bg-primary text-secondary fixed right-0 bottom-0 m-4 size-16 cursor-pointer rounded-full border-2`}
      >
        <ShoppingCart className="m-auto" size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-2 mx-4 max-w-2/3 min-w-72 p-2">
        <DropdownMenuLabel className="text-center">Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cart?.map((item) => (
          <Link href={`/products/${item.category}-${item.id}`} key={item.id}>
            <DropdownMenuItem className="flex">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${item.category}/${item.id}/${item.thumbnail}`}
                className="size-24 object-contain"
                height={300}
                width={200}
                alt={`${item.title} image`}
              />
              <div>
                <p>{item.title}</p>
                <span className="text-sm font-semibold">
                  &#8377; {item.price}{" "}
                  <span className="text-xs font-normal">x{item.qty}</span>
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex justify-between">
          <p>Total Price: </p>
          <p>&#8377; {totalPrice}</p>
        </DropdownMenuLabel>
        <Link
          href="/cart"
          className={`${buttonVariants()} mt-2 w-full p-4`}
          onClick={() => setIsOpen(false)}
        >
          Go to Cart
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Cart;

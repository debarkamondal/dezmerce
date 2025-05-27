"use client";
import { useCartContext } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { getCartValue } from "@/lib/actions";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const [totalUpdatedPrice, setTotalUpdatedPrice] = useState(0);
  const cart = useCartContext();
  useEffect(() => {
    const fn = async () => {
      let updatedValues: Record<string, number> = {};
      if (cart.length) updatedValues = await getCartValue(cart);
      if (updatedValues) {
        const price = cart.reduce((price, item) => {
          return (price += updatedValues[item.id] * item.qty);
        }, 0);
        setTotalUpdatedPrice(price);
      }
    };
    fn();
  }, [cart]);
  const totalPrice = cart.reduce((totalPrice, item) => {
    return (totalPrice += item.price * item.qty);
  }, 0);
  return (
    <main>
      <h1 className="mb-2 text-center text-2xl font-semibold">Cart</h1>
      {cart?.map((item) => (
        <Link
          href={`/products/${item.category}-${item.id}`}
          className="my-2 flex w-full rounded-md p-2 shadow"
          key={item.id}
        >
          <Image
            src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${item.category}/${item.id}/${item.thumbnail}`}
            className="size-24 object-contain"
            height={300}
            width={200}
            alt={`${item.title} image`}
          />
          <div className="w-3/5 p-4 md:grow">
            <p className="line-clamp-1">{item.title}</p>
            <span className="text-xs font-normal">
              <b>&#8377; {item.price}</b> x{item.qty}
            </span>
          </div>
          <div className="self-center font-semibold md:mt-4">
            &#8377; {item.qty * item.price}
          </div>
        </Link>
      ))}
      {/* <div className="bg-primary mt-4 h-[2px] w-full border" /> */}
      <p className="mt-4 flex items-center gap-2 px-2 font-semibold">
        <span>Total :</span>
        <span className="grow">
          &#8377; {totalUpdatedPrice !== 0 ? totalUpdatedPrice : totalPrice}
        </span>
        <Button className="mx-auto shrink place-self-end" asChild>
          <Link href={"/checkout"}>
            Checkout <ChevronRight />
          </Link>
        </Button>
      </p>
    </main>
  );
};

export default Cart;

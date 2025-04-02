'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import { useCartContext } from "./providers/CartProvider"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"


const Cart = () => {
    const cart = useCartContext()
    const totalPrice = cart.reduce((totalPrice, item) => {
        return totalPrice += item.price * item.qty
    }, 0
    )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger hidden={!totalPrice} className={`border-2 border-secondary cursor-pointer fixed bottom-0 right-0 bg-primary size-16 rounded-full text-secondary m-4`}>
                <ShoppingCart className="m-auto" size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="m-2 mx-4 min-w-72 max-w-2/3 p-2">
                <DropdownMenuLabel className="text-center">Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cart?.map((item) =>
                    <Link href={item.url} key={item.id}>
                        <DropdownMenuItem className="flex">
                            <Image src={item.image} className="size-24 object-contain" height={300} width={200} alt={`${item.title} image`} />
                            <div>
                                <p>{item.title}</p>
                                <span className="text-sm font-semibold">&#8377; {item.price} <span className="font-normal text-xs">x{item.qty}</span></span>
                            </div>
                        </DropdownMenuItem>
                    </Link>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex justify-between">
                    <p>Total Price: </p>
                    <p>&#8377; {totalPrice}</p>
                </DropdownMenuLabel>
                <Link href="/checkout" className={`${buttonVariants()} w-full p-4 mt-2`}>Check Out</Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default Cart

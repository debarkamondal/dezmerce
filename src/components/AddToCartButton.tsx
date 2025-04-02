'use client'
import { buttonVariants } from "@/components/ui/button";
import { useCartContext, useDispatchContext } from "@/components/providers/CartProvider";
import { Product } from "@/lib/types";
import { MinusIcon, PlusIcon } from "lucide-react";
const AddToCartButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatchContext()
    const cartItems = useCartContext()
    let item;
    if (cartItems) item = cartItems.filter((item) => item.id === product.id)[0]
    if (!item) item = { ...product, qty: 0 }
    return (
        <div className={`${buttonVariants({ variant: 'default' })} cursor-pointer my-2`} onClick={() => {
            if (item.qty === 0) dispatch({
                type: "add",
                item: { ...product, qty: 0 }
            })
        }}>
            <button className="cursor-pointer" hidden={item.qty === 0} onClick={() => dispatch({
                type: "delete",
                item: { ...product, qty: item.qty }
            })}><MinusIcon /></button>
            <span className="inline-block min-w-8 text-center cursor-default">{item.qty ? item.qty : "Add to Cart"}</span>
            <button className="cursor-pointer" hidden={item.qty === 0} onClick={() => dispatch({
                type: 'add',
                item: { ...product, qty: item.qty }
            })}><PlusIcon /></button>
        </div>
    )
}
export default AddToCartButton

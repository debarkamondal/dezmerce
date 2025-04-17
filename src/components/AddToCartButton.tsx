'use client'
import { buttonVariants } from "@/components/ui/button";
import { useCartContext, useDispatchContext } from "@/components/providers/CartProvider";
import { CartItem} from "@/lib/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { setCart } from "@/lib/actions";
const AddToCartButton = ({ product }: { product: Omit<CartItem, 'qty'> }) => {
    const dispatch = useDispatchContext()
    const cart = useCartContext()
    const user = useSession()
    let tempCart: CartItem[] = []
    let item
    if (cart) item = cart.filter((item) => item.id === product.id)[0]
    if (!item) item = { ...product, qty: 0 }
    else tempCart = cart.filter((item) => item.id !== product.id)

    const handleAdd = async () => {
        if (user) setCart([...tempCart, { ...item, qty: item.qty + 1 }])
        dispatch({
            type: 'add',
            item: item,
            user: user.data?.user
        })

    }
    const handleDelete = async () => {
        if (user) setCart([...tempCart, { ...item, qty: item.qty - 1 }])
        dispatch({
            type: 'delete',
            item: item,
            user: user.data?.user
        })

    }
    return (
        <div className={`${buttonVariants({ variant: 'default' })} cursor-pointer my-2`} onClick={!item.qty ? handleAdd : () => { }}>
            <button className="cursor-pointer" hidden={item.qty === 0} onClick={handleDelete}><MinusIcon /></button>
            <span className="inline-block min-w-8 text-center cursor-default">{item.qty ? item.qty : "Add to Cart"}</span>
            <button className="cursor-pointer" hidden={item.qty === 0} onClick={handleAdd}><PlusIcon /></button>
        </div>
    )
}
export default AddToCartButton

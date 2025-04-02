'use client'
import { cartItem } from "@/lib/types";
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";


type actionType = {
    type: 'add' | 'delete' | 'increase' | 'initiate',
    item?: cartItem,
    initialState?: cartItem[]
}

export const CartDispatchContext = createContext<Dispatch<actionType> | undefined>(undefined)
export const CartContext = createContext<Array<cartItem> | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window !== undefined) {
            const initialState = localStorage.getItem('cart')
            if (initialState) dispatch({ type: 'initiate', initialState: JSON.parse(initialState!) })
        }
    }, [])
    const [cart, dispatch] = useReducer(reducer, [])
    return (
        <CartContext.Provider value={cart} >
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider>

    )
}
const reducer = (cart: Array<cartItem> | undefined, action: actionType) => {
    if (cart === undefined) throw new Error("Cart context error")
    let temp: cartItem[]
    switch (action.type) {
        case 'add':
            if (action.item?.qty === 0) {
                temp = [...cart, { ...action.item, qty: 1 }]
            }
            else temp = cart.map(product => {
                if (product.id === action.item?.id) return { ...product, qty: product.qty + 1 }
                else return product
            })
            localStorage.setItem('cart', JSON.stringify(temp))
            return temp
        case 'delete':
            if (action.item?.qty === 1) {
                temp = cart.filter(product => product.id !== action.item?.id)
            }
            else temp = cart.map(product => {
                if (product.id === action.item?.id) return { ...product, qty: product.qty - 1 }
                else return product
            })
            localStorage.setItem('cart', JSON.stringify(temp))
            return temp
        case 'initiate':
            return JSON.parse(localStorage.getItem('cart')!)
        default:
            return cart
    }
}

export const useDispatchContext = () => {
    const dispatch = useContext(CartDispatchContext)
    if (dispatch === undefined) throw new Error("undefined Cart dispatcher")
    return dispatch
}
export const useCartContext = () => {
    const cart = useContext(CartContext)
    if (cart === undefined) throw new Error("undefined Cart dispatcher")
    return cart
}

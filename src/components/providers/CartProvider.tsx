"use client";
import { getCart } from "@/lib/actions";
import { CartItem } from "@/lib/types";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type actionType = {
  type: "add" | "delete" | "increase" | "initiate" | "update";
  item?: CartItem;
  state?: CartItem[];
  user?: User;
};

const CartDispatchContext = createContext<Dispatch<actionType> | undefined>(
  undefined,
);
const CartContext = createContext<Array<CartItem> | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data } = useSession();
  const [cart, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    if (!data?.user && typeof window !== undefined) {
      const initialState = localStorage.getItem("cart");
      if (initialState)
        dispatch({ type: "initiate", state: JSON.parse(initialState!) });
    } else {
      getCart().then((cart) => {
        if (cart.length) dispatch({ type: "initiate", state: cart });
      });
    }
  }, [data?.user]);
  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
const reducer = (cart: Array<CartItem> | undefined, action: actionType) => {
  if (cart === undefined) throw new Error("Cart context error");
  let temp: CartItem[];
  switch (action.type) {
    case "add":
      if (action.item?.qty === 0) return [...cart, { ...action.item, qty: 1 }];
      else
        temp = cart.map((item) => {
          if (item.id === action.item?.id)
            return { ...item, qty: item.qty + 1 };
          else return item;
        });
      if (!action.user) localStorage.setItem("cart", JSON.stringify(temp));
      return temp;
    case "delete":
      if (action.item?.qty === 1) {
        temp = cart.filter((product) => product.id !== action.item?.id);
      } else
        temp = cart.map((product) => {
          if (product.id === action.item?.id)
            return { ...product, qty: product.qty - 1 };
          else return product;
        });
      if (!action.user) localStorage.setItem("cart", JSON.stringify(temp));
      return temp;
    case "initiate":
      return action.state;

    case "update":
      return action.state;
    default:
      return cart;
  }
};

export const useDispatchContext = () => {
  const dispatch = useContext(CartDispatchContext);
  if (dispatch === undefined) throw new Error("undefined Cart dispatcher");
  return dispatch;
};
export const useCartContext = () => {
  const cart = useContext(CartContext);
  if (cart === undefined) throw new Error("undefined Cart dispatcher");
  return cart;
};

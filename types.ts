export type Product = {
    id:string,
    title: string,
    image: string,
    price: number
}
export interface cartItem extends Product {
    qty: number;
}

export type Product = {
    id:string,
    title: string,
    image: string,
    url: string
    price: number
}
export interface cartItem extends Product {
    qty: number;
}

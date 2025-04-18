export type CartItem = {
    id:string,
    title: string,
    image: string,
    price: number
    qty: number;
}
export type Product = {
    category: string;
    id: string;
    gender:string;
    thumbnail: string;
    title: string;
    defaultDelivery: string;
    price: number;
    ratings: Array<number>;
    images: Array<string>;
    variants: Array<Array<string>>;
    description: string;
    specs: {
        [key: string]: string;
    }
}


import DeliveryBox from "./DeliveryBox";
import AddToCartButton from "@/components/AddToCartButton";
import VariantSelector from "./VariantSelector";
import ImageCarousel from "./ImageCarousel";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { CartProvider } from "@/components/providers/CartProvider";

type mockProduct = {
    id: string;
    thumbnail: string;
    title: string;
    defaultDelivery: string;
    price: number;
    ratings: Array<number>;
    images: Array<string>;
    variants: Array<Array<string>>;
    info: string;
    specs: {
        [key: string]: string;
    }
}
const data: mockProduct = {
    id: '1',
    thumbnail: "https://m.media-amazon.com/images/I/611SuZX5oYL._SL1000_.jpg",
    title: "Espressif ESP32 DevKit v1",
    defaultDelivery: "12Jan",
    price: 540,
    ratings: [3, 2024],
    images: [
        "https://m.media-amazon.com/images/I/61YX-zoj9JL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/51Qw62A9HiL._SL1000_.jpg",
        "https://m.media-amazon.com/images/I/61Lri0ZUbML._SL1500_.jpg",
    ],
    variants: [["4 MB", "/products/1"], ["8 MB", "/products/2"], ["16 MB", "#link3"], ["32 MB", "#link4"], ["64 MB", "#link5"]],
    info: "Doit esp32 development board wifi+bluetooth , dual core esp 32 esp 32s esp 32 similar esp8266 esp32 is integrated with antenna and rf balun, power amplifier, low noise amplifiers, filters, and power management module. The entire solution takes up the least amount of printed circuit board area. This board is used with 2.4 ghz dual mode wi fi and bluetooth chips by tsmc 40nm low power technology, power and rf properties best, which is safe, reliable, and scalable to a variety of applications. Note images may differ from actual product.",
    specs: {
        size: "xl",
        fabric: "cotton",
        color: "red"
    }
};
export default async function Product({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    return (
        <main>
            <div className="flex flex-col items-center md:items-start md:flex-row md:gap-20 md:mt-8 text-foreground">
                <ImageCarousel imageUrls={[data.thumbnail, ...data.images]} />
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                    <h1 className="font-medium te.xt-lg">{data.title}</h1>
                    <span className="text-xs text-gray-500">
                        {data.ratings[0]} stars | {data.ratings[1]} reviews
                    </span>
                    <span className="font-bold">&#8377; {data.price}</span>
                    <CartProvider>
                        <AddToCartButton product={{
                            id: data.id,
                            title: data.title,
                            price: data.price,
                            image: data.thumbnail,
                            url: `/products/${id}`
                        }} />
                    </CartProvider>
                    <DeliveryBox defaultDelivery={data.defaultDelivery} />
                    <VariantSelector variants={data.variants} />
                </div>
            </div>
            <div className="m-2">
                <h2 className="font-semibold text-lg">Product Infomation</h2>
                <Table className="my-2 max-w-96 mx-auto">
                    <TableBody>
                        {Object.keys(data.specs).map((spec: string, index: number) => {
                            return (
                                <TableRow key={index}>
                                    {index === 0 && <TableCell className="rounded-tl-md bg-border">{spec}</TableCell>}
                                    {index != Object.keys(data.specs).length - 1 && index != 0 && <TableCell className="bg-border">{spec}</TableCell>}
                                    {index === Object.keys(data.specs).length - 1 && <TableCell className="rounded-bl-md bg-border">{spec}</TableCell>}
                                    <TableCell>{data.specs[spec]}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <p className="m-2 text-justify">{data.info}</p>
            </div>
        </main>
    );
}

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
import { type Product } from "@/lib/types";

export default async function Product({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const testData = await fetch(`https://${process.env.BACKEND_URL}/${process.env.STAGE}/products/${id}`)
    const product: Product = await testData.json()
    const data: Product = {
        id: product.id,
        thumbnail: product.thumbnail,
        category: product.category,
        gender: 'male',
        title: product.title,
        defaultDelivery: "12Jan",
        price: product.price,
        ratings: [3, 2024],
        images: product.images,
        variants: [["4 MB", "/products/1"], ["8 MB", "/products/2"], ["16 MB", "/products/3"], ["32 MB", "/products/4"], ["64 MB", "/products/5"]],
        description: product.description,
        specs: product.specs
    };
    return (
        <main className="relative md:grid md:grid-cols-2 md:gap-8">
            <ImageCarousel className="md:sticky md:top-20 md:self-start md:mt-8 mx-4 md:w-4/5" category={data.category} id={data.id} imageUrls={[data.thumbnail, ...data.images]} />
            <div className="text-center md:text-left flex flex-col items-center md:items-start text-sm mt-4">
                <h1 className="font-medium text-lg">{data.title}</h1>
                <span className="text-xs text-gray-500">
                    {data.ratings[0]} stars | {data.ratings[1]} reviews
                </span>
                <span className="font-bold">&#8377; {data.price}</span>
                <AddToCartButton product={{
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    image: data.thumbnail,
                }} />
                <DeliveryBox defaultDelivery={data.defaultDelivery} />
                <VariantSelector variants={data.variants} />
                <h2 className="font-semibold text-lg">Product Infomation</h2>
                <Table className="my-2 max-w-96 mx-auto text-center">
                    <TableBody>
                        {Object.keys(data.specs).map((spec: string, index: number) => {
                            return (
                                <TableRow key={index}>
                                    {index === 0 && <TableCell className="rounded-tl-md bg-border">{spec}</TableCell>}
                                    {index != Object.keys(data.specs).length - 1 && index != 0 && <TableCell className="bg-border">{spec}</TableCell>}
                                    {index === Object.keys(data.specs).length - 1 && Object.keys(data.specs).length != 1 && <TableCell className="rounded-bl-md bg-border">{spec}</TableCell>}
                                    <TableCell className="w-1/2">{data.specs[spec]}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <p className="text-left mx-2 leading-6">{data.description}</p>
            </div>
        </main>
    );
}

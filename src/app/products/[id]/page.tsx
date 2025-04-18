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
        <main>
            <div className="flex flex-col items-center md:items-start md:flex-row md:gap-20 md:mt-8 text-foreground">
                <ImageCarousel category={data.category} id={data.id} imageUrls={[data.thumbnail, ...data.images]} />
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                    <h1 className="font-medium te.xt-lg">{data.title}</h1>
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
                </div>
            </div>
            <div className="m-2">
                <h2 className="font-semibold text-lg">Product Infomation</h2>
                <Table className="my-2 max-w-96 mx-auto md:ml-16">
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
                <p className="m-2 text-justify">{data.description}</p>
            </div>
        </main>
    );
}

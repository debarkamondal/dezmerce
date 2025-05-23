import DeliveryBox from "./DeliveryBox";
import AddToCartButton from "@/components/AddToCartButton";
import VariantSelector from "./VariantSelector";
import ImageCarousel from "./ImageCarousel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { type Product } from "@/lib/types";
import { getProductById } from "@/lib/utils";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: Product = await getProductById(id);
  const data: Product = {
    id: product.id,
    thumbnail: product.thumbnail,
    category: product.category,
    gender: product.gender ?? "male",
    title: product.title,
    defaultDelivery: "12Jan",
    price: product.price,
    ratings: [3, 2024],
    images: product.images,
    variants: [
      ["4 MB", "/product/1"],
      ["8 MB", "/product/2"],
      ["16 MB", "/product/3"],
      ["32 MB", "/product/4"],
      ["64 MB", "/product/5"],
    ],
    description: product.description,
    specs: product.specs,
  };
  return (
    <main className="relative md:grid md:grid-cols-2 md:gap-8">
      <ImageCarousel
        className="mx-4 md:sticky md:top-20 md:mt-8 md:w-4/5 md:self-start"
        category={data.category}
        id={data.id}
        imageUrls={[data.thumbnail, ...data.images]}
      />
      <div className="mt-4 flex flex-col items-center text-center text-sm md:items-start md:text-left">
        <h1 className="text-lg font-medium">{data.title}</h1>
        <span className="text-xs text-gray-500">
          {data.ratings[0]} stars | {data.ratings[1]} reviews
        </span>
        <span className="font-bold">&#8377; {data.price}</span>
        <AddToCartButton product={{ ...data }} />
        <DeliveryBox defaultDelivery={data.defaultDelivery} />
        {data.variants && <VariantSelector variants={data.variants} />}
        <h2 className="text-lg font-semibold">Product Infomation</h2>
        <Table className="mx-auto my-4 max-w-96 text-center md:my-8">
          <TableBody>
            {Object.keys(data.specs).map((spec: string, index: number) => {
              return (
                <TableRow key={index}>
                  {index === 0 && (
                    <TableCell className="bg-border rounded-tl-md">
                      {spec}
                    </TableCell>
                  )}
                  {index != Object.keys(data.specs).length - 1 &&
                    index != 0 && (
                      <TableCell className="bg-border">{spec}</TableCell>
                    )}
                  {index === Object.keys(data.specs).length - 1 &&
                    Object.keys(data.specs).length != 1 && (
                      <TableCell className="bg-border rounded-bl-md">
                        {spec}
                      </TableCell>
                    )}
                  <TableCell className="w-1/2">{data.specs[spec]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className="mx-2 text-left leading-6">{data.description}</p>
      </div>
    </main>
  );
}

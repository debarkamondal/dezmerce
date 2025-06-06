import CardGrid from "@/components/ProductGrid";
import { productMetadata } from "@/lib/types";
import { getProductsByCategory } from "@/lib/utils";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const products: productMetadata[] = await getProductsByCategory(category);
  return (
    <main>
      <h2 className="m-2 text-2xl font-semibold capitalize">
        All {category}&apos;s
      </h2>
      <CardGrid products={products} />
      {/* {products.map((product) => { */}
      {/*   return ( */}
      {/*     <div */}
      {/*       key={product.id} */}
      {/*       className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow" */}
      {/*     > */}
      {/*       <Link */}
      {/*         href={`/products/${product.category}-${product.id}`} */}
      {/*         className="relative flex grow" */}
      {/*       > */}
      {/*         <Image */}
      {/*           src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${product.category}/${product.id}/${product.thumbnail}`} */}
      {/*           height={300} */}
      {/*           width={200} */}
      {/*           alt={`${product.title}-img`} */}
      {/*           className="size-32 rounded-md object-contain" */}
      {/*         /> */}
      {/*         <div className="m-2 mb-4 flex grow flex-col justify-start"> */}
      {/*           <p className="font-semibold capitalize">{product.title}</p> */}
      {/*           <p className="text-sm font-light capitalize">{}</p> */}
      {/*           <span className="mt-2">Rs. {product.price}</span> */}
      {/*         </div> */}
      {/*       </Link> */}
      {/*     </div> */}
      {/*   ); */}
      {/* })} */}
    </main>
  );
};
export default CategoryPage;

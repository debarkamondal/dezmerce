import CategoryForm from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import { productMetadata } from "@/lib/types";
import { getCategories } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const categories = await getCategories()
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories/${category}`,
    {
      cache: "reload"
    }
  );
  const products: productMetadata[] = await res.json();
  return (
    <main>
      <section className="flex gap-4">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${categories[category].image}`}
          className="h-48 w-36 rounded-md"
          height="300"
          width="200"
          alt="Category image"
        />
        <div className="self-end">
          <h1 className="text-2xl font-semibold capitalize">{category}</h1>
          <p className="my-2 text-sm">(Qty: {categories[category].qty})</p>
          <CategoryForm
            categoryData={categories[category]}
            initCategory={category}
          >
            <Button>
              <Pencil />
              Edit
            </Button>
          </CategoryForm>
        </div>
      </section>
      <h2 className="m-2 mt-8 text-xl font-semibold">All {category}s</h2>
      {products.map((product) => {
        const cat = product.pk.split(":")[1]
        return (
          <div
            key={product.sk}
            className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow"
          >
            <Link
              href={`/products/${cat}-${product.sk}`}
              className="relative flex grow"
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${cat}/${product.sk}/${product.thumbnail}`}
                height={300}
                width={200}
                alt={`${product.title}-img`}
                className="size-24 rounded-md object-contain"
              />
              <div className="m-2 mb-4 flex grow flex-col justify-start">
                <p className="font-semibold capitalize">{product.title}</p>
                <p className="text-sm font-light capitalize">{ }</p>
                <span className="mt-2">Rs. {product.price}</span>
              </div>
            </Link>
          </div>
        );
      })}
    </main>
  );
};
export default CategoryPage;

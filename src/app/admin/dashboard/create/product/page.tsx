import { ProductForm } from "@/components/forms/ProductForm";

export default async function ProductPage() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`,
    { next: { tags: ["categories"] } },
  );
  const categories = await res.json();
  return (
    <div className="mx-4 md:mx-auto md:max-w-1/2">
      <ProductForm cats={categories}>
        <h1 className="my-2 text-2xl font-semibold">Add Product</h1>
      </ProductForm>
    </div>
  );
}

import { ProductForm } from "@/components/forms/ProductForm";
import { getCategories } from "@/lib/utils";

export default async function ProductPage() {
  const categories = await getCategories()
  return (
    <div className="mx-4 md:mx-auto md:max-w-1/2">
      <ProductForm cats={categories}>
        <h1 className="my-2 text-2xl font-semibold">Add Product</h1>
      </ProductForm>
    </div>
  );
}

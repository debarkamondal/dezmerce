import { ProductForm } from "@/components/forms/ProductForm"


export default async function ProductPage() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`, {next: {tags: ['categories']}})
    const categories = await res.json()
    return (
        <div className="md:max-w-1/2 mx-4 md:mx-auto">
            <ProductForm cats={categories}>
                <h1 className="font-semibold text-2xl my-2">Add Product</h1>
            </ProductForm>
        </div>
    )
}

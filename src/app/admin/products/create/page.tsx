import { ProductForm } from "@/components/forms/ProductForm"


export default async function ProductModal() {
    return (
        <div className="md:max-w-1/2 mx-4 md:mx-auto">
            <ProductForm >
                <h1 className="font-semibold text-2xl my-2">Add Product</h1>
            </ProductForm>
        </div>
    )
}

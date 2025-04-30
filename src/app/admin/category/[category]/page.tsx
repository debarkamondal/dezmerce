import CategoryForm from "@/components/forms/CategoryForm"
import { Button } from "@/components/ui/button"
import { category, productMetadata } from "@/lib/types"
import { Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`, { next: { tags: ['categories'] }, cache: "force-cache" })
    const categories: { [name: string]: category } = await res.json()
    res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories/${category}`)
    const products: productMetadata[] = await res.json()
    return (
        <main>
            <section className="flex gap-4">
                <Image src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${categories[category].image}`} className="w-36 h-48 rounded-md" height="300" width="200" alt="Category image" />
                <div className="self-end">
                    <h1 className="text-2xl font-semibold capitalize">{category}</h1>
                    <p className="text-sm my-2">(Qty: {categories[category].qty})</p>
                    <CategoryForm categoryData={categories[category]} initCategory={category}>
                        <Button><Pencil />Edit</Button>
                    </CategoryForm>
                </div>
            </section>
            <h2 className="font-semibold text-xl mt-8 m-2">All {category}s</h2>
            {products.map((product) => {
                return <div key={product.sk} className="flex gap-2 shadow p-2 rounded-md my-2 min-h-24">
                    <Link href={`/products/${product.pk}-${product.sk}`} className="relative flex grow" >
                        <Image src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${product.pk}/${product.sk}/${product.thumbnail}`} height={300} width={200} alt={`${product.title}-img`} className="size-24 rounded-md object-contain" />
                        <div className="m-2 mb-4 grow justify-start flex flex-col">
                            <p className="font-semibold capitalize">{product.title}</p>
                            <p className="text-sm font-light capitalize">{}</p>
                            <span className="mt-2">Rs. {product.price}</span>
                        </div>
                    </Link>
                </div>
            }
            )}
        </main>
    )
}
export default CategoryPage

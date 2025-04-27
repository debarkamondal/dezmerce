import { Chart } from "@/components/Chart"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/forms/ProductForm"
import { Pencil, Plus } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogTitle, DialogContent, DialogTrigger, DialogHeader } from "@/components/ui/dialog"

const chartData = [
    { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
    { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
    { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
    { category: "Top", orders: 173, fill: "var(--color-top)" },
    { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
]

type allProduct = {
    title: string,
    sk: string,
    price: number,
    thumbnail: string
}
const adminProducts = async () => {
    const session = await auth()
    if (session?.user.role !== 'admin') redirect("/api/auth/signin")
    const temp = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/products`, { cache: "force-cache" })
    const data = await temp.json()
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`, { next: { tags: ['categories'] }, cache: "force-cache" })
    const categories = res.json()

    return (
        <main>
            <div className="flex justify-between items-center mx-4">
                <h1 className="text-2xl md:text-4xl font-semibold my-2 md:my-4">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/create" >Add <Plus /></Link>
                </Button>
            </div>
            <div className="mx-2">
                <Chart title="Inventory" data={chartData} />
            </div>
            <h1 className="text-lg font-semibold text-center my-4">All products</h1>
            {data.map((product: allProduct) => {
                const [category, id] = product.sk.split("-")
                return <div key={id} className="flex gap-2 shadow p-2 rounded-md my-2 min-h-24">
                    <Link href={`/products/${product.sk}`} className="relative flex grow" >
                        <Image src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${category}/${id}/${product.thumbnail}`} height={300} width={200} alt={`${product.title}-img`} className="size-24 rounded-md object-contain" />
                        <div className="m-2 mb-4 grow justify-start flex flex-col">
                            <p className="font-semibold">{product.title}</p>
                            <p className="text-sm font-light capitalize">{}</p>
                            <span className="font-semibold mt-2">&#8377; {product.price}</span>
                        </div>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="self-center cursor-pointer" ><Pencil /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm id={product.sk} cats={categories} />
                        </DialogContent>
                    </Dialog>
                </div>
            }
            )}
        </main >
    )
}
export default adminProducts

import { Chart } from "@/components/Chart"
import { Button } from "@/components/ui/button"
import {  Plus } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import CategoryForm from "@/components/forms/CategoryForm"

const chartData = [
    { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
    { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
    { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
    { category: "Top", orders: 173, fill: "var(--color-top)" },
    { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
]

type category = {
    qty: number,
    image: string,
}
const adminProducts = async () => {
    const session = await auth()
    if (session?.user.role !== 'admin') redirect("/api/auth/signin")
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`, { next: { tags: ['categories'] }, cache: "force-cache" })
    const categories: { [name: string]: category } = await res.json()

    delete categories.pk
    delete categories.sk
    return (
        <main>
            <div className="flex justify-between items-center mx-4">
                <h1 className="text-2xl md:text-4xl font-semibold my-2 md:my-4">Dashboard</h1>
                <Button asChild>
                    <Link href="/admin/dashboard/create/product" >Add Product</Link>
                </Button>
            </div>
            <div className="mx-2">
                <Chart title="Inventory" data={chartData} />
            </div>
            <div className="flex items-center gap-4 mx-4">
                <h1 className="text-lg font-semibold my-4">All Categories</h1>
                <CategoryForm >
                <Button className="rounded-full size-8 cursor-pointer"><Plus/></Button>
                </CategoryForm>
            </div>
            {Object.keys(categories).map((key: string) => {
                const category: category = categories[key]
                return <div key={key} className="flex gap-2 shadow p-2 rounded-md my-2 min-h-24">
                    <Link href={`/admin/dashboard/create/product`} className="relative flex grow" >
                        <Image src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${category.image}`} height={300} width={200} alt={`${key}-img`} className="size-24 rounded-md object-contain" />
                        <div className="m-2 mb-4 grow justify-start flex flex-col">
                            <p className="font-semibold capitalize">{key}</p>
                            <p className="text-sm font-light capitalize">{}</p>
                            <span className="mt-2">Qty: {category.qty}</span>
                        </div>
                    </Link>
                </div>
            }
            )}
        </main >
    )
}
export default adminProducts

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Chart } from "@/components/Chart"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/forms/ProductForm"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const chartData = [
    { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
    { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
    { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
    { category: "Top", orders: 173, fill: "var(--color-top)" },
    { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
]
const adminProducts = async() => {
    const session = await auth()
    if (session?.user.role !== 'admin') redirect("/api/auth/signin")
    return (
        <main>
            <div className="flex justify-between mx-4">
                <h1 className="text-2xl md:text-4xl font-semibold my-2 md:my-4">Products</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add <Plus /></Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="add product form">
                        <DialogHeader>
                            <DialogTitle>Add Product</DialogTitle>
                        </DialogHeader>
                        <ProductForm />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mx-2">
                <Chart title="Inventory" data={chartData} />
            </div>

        </main>
    )
}
export default adminProducts

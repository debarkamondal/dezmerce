"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/forms/ProductForm"


export default function ProductModal() {
    const router= useRouter()
    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogTrigger hidden>Open</DialogTrigger>
            <DialogContent aria-describedby="add product form" className="max-h-5/6 overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <ProductForm  />
            </DialogContent>
        </Dialog>
    )
}

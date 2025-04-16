'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useActionState } from "react";
import { Product } from "@/lib/types";
import { ProductForm } from "./forms/ProductForm"

const initFormData = {

    thumbnail: "",
    title: "Enter title of the product",
    defaultDelivery: "",
    category: 'Enter Category',
    gender: '',
    price: 0,
    ratings: [],
    images: [],
    variants: [],
    info: "Enter some info",
    specs: {}
}

const AddProductDialogue = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add <Plus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <ProductForm/>
            </DialogContent>
        </Dialog>

    )
}
export default AddProductDialogue

"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function ProductModal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogTrigger hidden>Open</DialogTrigger>
            <DialogContent aria-describedby="add product form" className="max-h-5/6 overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

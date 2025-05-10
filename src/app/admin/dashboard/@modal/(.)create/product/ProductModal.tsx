"use client";

import { ProductForm } from "@/components/forms/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductModal({
  categories,
}: {
  categories: Record<string, string>;

}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  return (
    <Dialog open={isDialogOpen} onOpenChange={() => {
      router.back()
      return setIsDialogOpen
    }}>
      <DialogTrigger hidden>Open</DialogTrigger>
      <DialogContent
        aria-describedby="add product form"
        className="max-h-5/6 overflow-scroll"
      >
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <ProductForm cats={categories} setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}

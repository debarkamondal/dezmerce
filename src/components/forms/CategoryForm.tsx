"use client"
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { startTransition, useRef, useState } from "react";
import { addCategory, revalidatetag } from "@/lib/actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
const CategoryForm = ({ setCategories, children }: { setCategories?: (action: string[]) => void, children?: React.ReactNode }) => {
    const catImgRef = useRef<HTMLInputElement>(null)
    const [category, setCategory] = useState("")
    const [catImg, setCatImg] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleAddCategory = async () => {
        setIsLoading(true)
        if(!catImgRef.current?.files) throw Error("Image not uploaded")
        const image = catImgRef.current?.files[0]
        //Optimistically update if setOptimistic action passed
        if (setCategories) startTransition(() => { setCategories([category]) })
        const imgUrl = await addCategory(category, catImgRef.current?.files[0].name)
        console.log(imgUrl)
        if (imgUrl) await fetch(imgUrl,
            {
                method: 'PUT',
                headers: { 'Content-Type': image.type},
                body: image
            })
        setIsLoading(false)
        revalidatetag("categories")
        setIsDialogOpen(false)
        setCatImg("")
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {children || <Button>Add category</Button>}
            </DialogTrigger>
            <DialogContent className="mx-auto absolute">
                <DialogTitle>
                    <DialogHeader> Add Category</DialogHeader>
                </DialogTitle>
                <div className="flex flex-col gap-2">
                    <Image src={catImg || "/upload-img.png"} className={`${catImg ? "size-36 p-0 shadow-none" : "size-16"} p-2 mx-auto shadow drop-shadow rounded-md object-contain`} height={100} width={100} alt="category image" onClick={() => catImgRef.current?.click()} />
                    {!catImg && <span className="mb-2 text-center text-sm text-primary">Upload .jpg, .png, .webp</span>}
                    <Input type="file" hidden ref={catImgRef} onChange={(e) => (e.target.files !== null) && setCatImg(URL.createObjectURL(e.target.files[0]))} />
                    <Input placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)} />
                    <Button disabled={isLoading} type="button" onClick={handleAddCategory}>{isLoading ? <Image src="/spinner.svg" height={20} width={20} alt="loading spinner" className="invert" /> : "Add Category"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default CategoryForm

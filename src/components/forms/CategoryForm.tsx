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
const CategoryForm = ({ setCategories }: { setCategories: (action: string[]) => void }) => {
    const catImgRef = useRef<HTMLInputElement>(null)
    const [category, setCategory] = useState("")
    const [catImg, setCatImg] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleAddCategory = async () => {
        startTransition(() => { setCategories([category]) })
        if (catImgRef.current?.files && catImgRef.current.files[0].name) await addCategory(category, catImgRef.current?.files[0])
        revalidatetag("categories")
        setCatImg("")
        setIsDialogOpen(false)
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add category</Button>
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
                    <Button type="button" onClick={handleAddCategory}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default CategoryForm

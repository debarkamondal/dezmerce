'use client'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const action = async (_: string|undefined, formData: FormData) => {
        const searchString = formData.get('search') as string
        setIsDialogOpen(!isDialogOpen)
        router.push(`/results?search=${searchString.replaceAll(' ', '+')}`)
        return searchString
    }
    const [formData, formAction] = useActionState(action, undefined)
    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(!isDialogOpen)}>
                <DialogTrigger className="md:hidden">
                    <SearchIcon />
                </DialogTrigger> <DialogContent>
                    <DialogHeader>
                        <DialogTitle hidden>Search</DialogTitle>
                        <DialogDescription hidden>Search anything on the website!</DialogDescription>
                        <form className="space-y-2 mt-5 flex gap-2" action={formAction}>
                            <label htmlFor="searchString" />
                            <Input type="text" placeholder={`Search`} id="searchString" name="search" defaultValue={formData} />
                            <Button type="submit">
                                <SearchIcon />
                            </Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="hidden md:block">
                <form className="flex gap-2" action={formAction}>
                    <label htmlFor="searchString" />
                    <Input type="text" placeholder="Search" id="searchString" name="search" defaultValue={formData} />
                    <Button type="submit">
                        <SearchIcon />
                    </Button>
                </form>
            </div>
        </>
    )
}
export default SearchBar

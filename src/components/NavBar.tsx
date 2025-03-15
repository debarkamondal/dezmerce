import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default async function NavBar() {
    return (
        <nav className="p-2 flex justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
            </Link>
            <div className="flex gap-10">
            <Dialog>
                <DialogTrigger>
                    <Image src={"/search-icon.svg"} alt="search-icon" width="25" height="25" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle hidden>Search</DialogTitle>
                        <DialogDescription hidden>Search anything on the website!</DialogDescription>
                        <form className="space-y-2 mt-5" action="/results">
                            <label htmlFor="searchString" />
                            <Input type="text" placeholder="Search" id="searchString" name="search"/>
                            <Button type="submit">Submit</Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger className="pr-2">
                    <div className="h-5 flex flex-col justify-around">
                        <div className="w-5 h-[2px] bg-foreground" />
                        <div className="w-5 h-[2px] bg-foreground" />
                        <div className="w-5 h-[2px] bg-foreground" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </nav>
    );
}

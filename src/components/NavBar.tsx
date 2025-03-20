import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

type NavLinks = { [key: string]: string }
const navLinks: NavLinks = {
    "products": "/products",
    "about-us": "/about-us",
    "support": "/support"
}

export default async function NavBar() {
    return (
        <nav className="p-2 flex justify-between items-center gap-4 mx-auto">
            <Link href={"/"}>
                <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
            </Link>
            <ul className="gap-16 align-self-start grow ml-14 hidden lg:flex">
                {Object.keys(navLinks).map((link) =>
                    <Link href={navLinks[link]} key={link}>
                        <li className="uppercase font-semibold" >{link}</li>
                    </Link>
                )}
            </ul>
            <div className="flex gap-10 items-center">
                <Dialog>
                    <DialogTrigger className="md:hidden">
                        <SearchIcon />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle hidden>Search</DialogTitle>
                            <DialogDescription hidden>Search anything on the website!</DialogDescription>
                            <form className="space-y-2 mt-5 flex gap-2" action="/results">
                                <label htmlFor="searchString" />
                                <Input type="text" placeholder={`Search`} id="searchString" name="search" />
                                <Button type="submit">
                                    <SearchIcon />
                                </Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="hidden md:block">
                    <form className="flex gap-2" action="/results">
                        <label htmlFor="searchString" />
                        <Input type="text" placeholder="Search" id="searchString" name="search" />
                        <Button type="submit">
                            <SearchIcon />
                        </Button>
                    </form>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="pr-2 lg:hidden">
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
        </nav >
    );
}

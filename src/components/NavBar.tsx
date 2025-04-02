import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SearchBar from "./SearchBar";

type NavLinks = { [key: string]: string }
const navLinks: NavLinks = {
    "products": "/products",
    "about": "/about",
    "support": "/support"
}

export default async function NavBar() {
    return (
        <nav className="p-2 flex justify-between items-center gap-4">
            <Link href={"/"}>
                <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
            </Link>
            <ul className="gap-16 align-self-start grow ml-14 hidden lg:flex">
                {Object.keys(navLinks).map((link) =>
                    <Link href={navLinks[link]} key={link}>
                        <li className="uppercase font-semibold text-sm" >{link}</li>
                    </Link>
                )}
            </ul>
            <div className="flex gap-10 items-center">
                <SearchBar />
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

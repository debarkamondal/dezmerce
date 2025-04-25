import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { auth } from "@/auth";

type NavLinks = { [key: string]: string }
const userLinks: NavLinks = {
    "products": "/products",
    "about": "/about",
    "support": "/support"
}
const adminLinks: NavLinks = {
    "products": "/admin/products",
    "orders": "/admin/orders",
}

export default async function NavBar() {
    const session = await auth()
    console.log(session)
    const navLinks = session?.user.role === 'admin'? adminLinks:  userLinks
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
                        {Object.keys(navLinks).map((link) =>
                            <DropdownMenuItem key={link}>
                                <Link href={navLinks[link]} className="capitalize">
                                    {link}
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            {!session && <SignIn />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {!session?.user && <SignIn className="hidden lg:block" />}
            </div>
        </nav >
    );
}

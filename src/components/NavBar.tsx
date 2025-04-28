"use client";

import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SearchBar from "./SearchBar";
// import SignIn from "./SignIn";
import { useSession, signIn } from "next-auth/react";
import { Button } from "./ui/button";

type NavLinks = { [key: string]: string }
const userLinks: NavLinks = {
    "products": "/products",
    "about": "/about",
    "support": "/support"
}
const adminLinks: NavLinks = {
    "dashboard": "/admin/dashboard",
    "orders": "/admin/orders",
}

export default function NavBar() {
    const { data: session } = useSession();
    const navLinks = session?.user?.role === 'admin' ? adminLinks : userLinks;

    
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
                            {!session && <Button onClick={() => signIn()}>Sign In</Button>}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {!session?.user && <Button className="hidden md:block" onClick={() => signIn()}>Sign In</Button>}
            </div>
        </nav >
    );
}

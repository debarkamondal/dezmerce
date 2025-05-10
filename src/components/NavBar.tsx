"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

type NavLinks = { [key: string]: string };
const userLinks: NavLinks = {
  about: "/about",
  support: "/support",
};
const adminLinks: NavLinks = {
  dashboard: "/admin/dashboard",
  orders: "/admin/orders",
};

export default function NavBar() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Array<string>>()
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`, { next: { tags: ['categories'] } })
      const cats = await data.json()
      delete (cats.pk)
      delete (cats.sk)
      setCategories(Object.keys(cats))
    }
    getCategories()
  }, [])
  const navLinks = session?.user?.role === "admin" ? adminLinks : userLinks;

  return (
    <nav className="flex items-center justify-between gap-4 p-2">
      <Link href={"/"}>
        <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
      </Link>
      <ul className="align-self-start ml-14 hidden grow gap-16 lg:flex">
        {Object.keys(navLinks).map((link) => (
          <Link href={navLinks[link]} key={link}>
            <li className="text-sm font-semibold uppercase">{link}</li>
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-10">
        <SearchBar />
        <DropdownMenu>
          <DropdownMenuTrigger className="pr-2 lg:hidden" >
            <div className="flex h-5 flex-col justify-around">
              <div className="bg-foreground h-[2px] w-5" />
              <div className="bg-foreground h-[2px] w-5" />
              <div className="bg-foreground h-[2px] w-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {categories?.map((category) => (
                    <Link key={category} href={session?.user.role === 'admin' ? `/admin/category/${category}` : `/category/${category}`} className="capitalize">
                      <DropdownMenuItem>
                        {category}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {Object.keys(navLinks).map((link) => (
              <Link key={link} href={navLinks[link]} className="capitalize">
                <DropdownMenuItem>
                  {link}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuItem>
              {!session && <Button onClick={() => signIn()}>Sign In</Button>}
              {session?.user && (
                <Button onClick={() => signOut()}>Sign Out</Button>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {!session?.user && (
          <Button className="hidden md:block" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
        {session?.user && (
          <Button className="hidden md:block" onClick={() => signOut()}>
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
}

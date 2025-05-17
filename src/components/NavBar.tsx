"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getCategories } from "@/lib/utils";

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
  const [categories, setCategories] = useState<Array<string>>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const cats = await getCategories();
      setCategories(Object.keys(cats));
    };
    getData();
  }, []);
  const navLinks = session?.user?.role === "admin" ? adminLinks : userLinks;

  return (
    <nav className="flex items-center justify-between gap-4 p-2">
      <Link href={"/"}>
        <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
      </Link>
      <ul className="align-self-start ml-14 hidden grow gap-16 text-sm font-semibold uppercase lg:flex">
        <li>
          <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              onMouseEnter={() => setIsOpen(true)}
              className="flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase"
            >
              Categories
              <ChevronDown size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent onMouseLeave={() => setIsOpen(false)}>
              {categories?.map((category) => (
                <Link
                  key={category}
                  href={
                    session?.user.role === "admin"
                      ? `/admin/category/${category}`
                      : `/category/${category}`
                  }
                  className="cursor-pointer capitalize"
                >
                  <DropdownMenuItem>{category}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        {Object.keys(navLinks).map((link) => (
          <Link href={navLinks[link]} key={link}>
            <li>{link}</li>
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="pr-2 lg:hidden">
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
                    <Link
                      key={category}
                      href={
                        session?.user.role === "admin"
                          ? `/admin/category/${category}`
                          : `/category/${category}`
                      }
                      className="capitalize"
                    >
                      <DropdownMenuItem>{category}</DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {Object.keys(navLinks).map((link) => (
              <Link key={link} href={navLinks[link]} className="capitalize">
                <DropdownMenuItem>{link}</DropdownMenuItem>
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

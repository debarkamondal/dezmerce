import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
export default async function NavBar() {
    return (
        <nav className="p-2 flex justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.png"} height="50" width="50" alt="brand-logo" />
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger className="pr-2">
                    <div className="h-5 flex flex-col justify-around">
                        <div className="w-5 h-px bg-foreground" />
                        <div className="w-5 h-px bg-foreground" />
                        <div className="w-5 h-px bg-foreground" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}

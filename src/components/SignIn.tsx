import { signIn } from "@/auth"
import { Button } from "./ui/button"
import Image from "next/image"

export default function SignIn({ className }: { className?: string }) {
    return (
        <form
            className={className}
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <Button type="submit">
                <Image src={"/github-logo.svg"} height="20" width="20" alt="github-icon" className="invert" /> Sign in
            </Button>
        </form>
    )
} 

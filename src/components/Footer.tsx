import Image from "next/image"
import Link from "next/link"

const socialLinks = {
    instagram: "https://instagram.com/debarkamondal",
    github: "https://github.com/debarkamondal",
    linkedin: "https://linkedin.com/in/debarkamondal"
}
const Footer = async () => {
    return (
        <footer className="relative bg-primary text-secondary p-4 py-8 md:text-center md:flex flex-col items-center gap-2 md:gap-4 mt-2">
            <div className="w-4/5 text-sm md:text-base md:flex flex-col items-center md:gap-2">
                <p className="font-medium">This website is made by</p>
                <span className="font-alex-brush text-3xl md:text-5xl font-bold">Dezire</span>
                <div className="w-8/12 md:w-24 h-px bg-secondary mb-2"></div>
                <p>If you want to get it customized or hosted please contact.</p>
            </div>
            <div className="absolute right-1 top-0 h-full md:static justify-center flex flex-col md:flex-row gap-2 md:gap-4 px-2">
                <Link href={socialLinks.linkedin} target="_blank">
                    <Image src={"/linkedin-logo.svg"} alt="LinkedIn logo" width={25} height={25} className="invert" />
                </Link>
                <Link href={socialLinks.instagram} target="_blank">
                    <Image src={"/instagram-logo.svg"} alt="Instagram logo" width={25} height={25} className="invert" />
                </Link>
                <Link href={socialLinks.github} target="_blank">
                    <Image src={"/github-logo.svg"} alt="Github logo" width={25} height={25} className="invert" />
                </Link>
            </div>
        </footer>
    )

}
export default Footer

import Image from "next/image";
import Link from "next/link";

const socialLinks = {
  instagram: "https://instagram.com/debarkamondal",
  github: "https://github.com/debarkamondal",
  linkedin: "https://linkedin.com/in/debarkamondal",
};
const Footer = () => {
  return (
    <footer className="bg-primary text-secondary relative mt-2 flex-col items-center gap-2 p-4 py-8 md:flex md:gap-4 md:text-center">
      <div className="w-4/5 flex-col items-center text-sm md:flex md:gap-2 md:text-base">
        <p className="font-medium">This website is made by</p>
        <span className="font-alex-brush text-3xl font-bold md:text-5xl">
          Dezire
        </span>
        <div className="bg-secondary mb-2 h-px w-8/12 md:w-24"></div>
        <p>If you want to get it customized or hosted please contact.</p>
      </div>
      <div className="absolute top-0 right-1 flex h-full flex-col justify-center gap-2 px-2 md:static md:flex-row md:gap-4">
        <Link href={socialLinks.linkedin} target="_blank">
          <Image
            src={"/linkedin-logo.svg"}
            alt="LinkedIn logo"
            width={25}
            height={25}
            className="invert"
          />
        </Link>
        <Link href={socialLinks.instagram} target="_blank">
          <Image
            src={"/instagram-logo.svg"}
            alt="Instagram logo"
            width={25}
            height={25}
            className="invert"
          />
        </Link>
        <Link href={socialLinks.github} target="_blank">
          <Image
            src={"/github-logo.svg"}
            alt="Github logo"
            width={25}
            height={25}
            className="invert"
          />
        </Link>
      </div>
    </footer>
  );
};
export default Footer;

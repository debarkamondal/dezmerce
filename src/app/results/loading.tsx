import Image from "next/image";

export default function Loading() {
    return <div className="absolute top-0 left-0 h-full w-full flex flex-col gap-2 items-center justify-center">
        <Image src={"/spinner.svg"} height={50} width={50} alt={"loading-spinner"} />
        <span>Loading...</span>
    </div>

}

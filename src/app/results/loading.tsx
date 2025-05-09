import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-2">
      <Image
        src={"/spinner.svg"}
        height={50}
        width={50}
        alt={"loading-spinner"}
      />
      <span>Loading...</span>
    </div>
  );
}

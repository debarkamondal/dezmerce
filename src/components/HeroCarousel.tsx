import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type CarouselData = {
    hook: string,
    category: string,
    price: number,
    image: string
}


const HeroCarousel = (props: { carouselData: CarouselData[] }) => {
    return (
        <Carousel>
            <CarouselContent>
                {props.carouselData.map((item) => {
                    return (
                        <CarouselItem className="relative" key={item.image}>
                            <div className="flex justify-evenly items-center">
                                <div className="absolute md:static grow md:grow-0 left-4 bottom-0 p-4 text-secondary md:text-primary bg-linear-to-r from-primary/70 to-60% rounded-b-xl md:bg-none md:space-y-4">
                                    <p className="md:mx-4 text-xl md:text-4xl font-light">{item.hook}</p>
                                    <p className={`font-alex-brush text-5xl md:text-9xl font-normal`}>{item.category}</p>
                                    <p className="md:mx-4 font-medium">Starting from &#8377; {item.price}* </p>
                                    <Button className="mt-2 w-16 h-16 rounded-full bg-secondary md:bg-primary"><ChevronRight className="size-8 text-primary md:text-secondary" /></Button>
                                </div>
                                <Image src={item.image} height={900} width={800} alt="hero-image-1" className="rounded-xl w-full md:w-72 lg:min-w-96" />
                            </div>
                        </CarouselItem>
                    )
                })}
                <CarouselItem>
                    <div className="relative flex h-full items-center justify-center bg-white dark:bg-black">
                        <div
                            className={cn(
                                "absolute inset-0",
                                "[background-size:20px_20px]",
                                "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                                "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                            )}
                        />
                        {/* Radial gradient for the container to give a faded look */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                        <div className="relative z-20 py-8">
                            <div className="flex flex-col items-center justify-center h-full gap-12 px-2 text-center">
                                <p className="text-5xl">Want this website for </p>
                                <span className={`font-alex-brush text-8xl md:text-9xl`}>Yourself?</span>
                                <p className="text-xl">You can host it yourself or hire me</p>
                                <div className="space-x-8 flex items-center">
                                    <Button className="w-32 h-12 font-bold">
                                        <span>Github</span>
                                        <Image src={"/github-logo.svg"} height="20" width="20" alt="github-icon" className="invert" />
                                    </Button>
                                    <Button className="w-32 h-12 font-bold">Contact Me</Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden lg:block p-2 mx-8 xl:mx-0" />
            <CarouselNext className="hidden lg:block p-2 mx-8 xl:mx-0" />
        </Carousel>
    )
}
export default HeroCarousel

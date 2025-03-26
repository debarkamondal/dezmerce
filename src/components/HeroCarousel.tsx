import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
    variable: "--font-alex-brush",
    weight: "400",
    style: "normal"
})

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
                            <div className="flex justify-around items-center">
                                <div className="absolute md:static w-full left-4 bottom-0 p-4 text-secondary md:text-primary bg-linear-to-r from-primary/70 to-60% rounded-b-xl md:bg-none md:space-y-4">
                                    <p className="md:mx-4 text-xl md:text-4xl font-light">{item.hook}</p>
                                    <p className={`${alexBrush.className} text-5xl md:text-9xl font-normal`}>{item.category}</p>
                                    <p className="md:mx-4 font-medium">Starting from &#8377; {item.price}* </p>
                                    <Button className="mt-2 w-16 h-16 rounded-full bg-secondary md:bg-primary"><ChevronRight className="size-8 text-primary md:text-secondary" /></Button>
                                </div>
                                <Image src={item.image} height={900} width={800} alt="hero-image-1" className="rounded-xl w-full md:w-72 lg:min-w-96" />
                            </div>
                        </CarouselItem>
                    )
                })}
                <CarouselItem>
                    <div className="flex flex-col items-center justify-center h-full gap-12">
                        <p className="text-5xl">Want this website for </p>
                        <span className={`${alexBrush.className} text-8xl`}>Yourself?</span>
                        <p className="text-xl">You can host it yourself or we can do it for you</p>
                        <div className="space-x-8 flex items-center">
                            <Button className="w-32 h-12 font-bold">
                                <span>Github</span>
                                <Image src={"/github.svg"} height="20" width="20" alt="github-icon" className="invert" />
                            </Button>
                            <Button className="w-32 h-12 font-bold">Contact Us</Button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden xl:block p-2" />
            <CarouselNext className="hidden xl:block p-2" />
        </Carousel>
    )
}
export default HeroCarousel

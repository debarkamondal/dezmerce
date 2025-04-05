import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {

    return (
        <Carousel
            plugins={[Autoplay({
                delay: 2000
            })]}
            className="text-center mx-14 max-w-80"
            opts={{
                loop: true
            }}>
            <CarouselContent>
                {imageUrls.map((image, index) => {
                    return (
                        <CarouselItem key={index}>
                            <Image
                                src={image}
                                alt={`product-image-${index}`}
                                width={300}
                                height={200}
                                className="size-auto"
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

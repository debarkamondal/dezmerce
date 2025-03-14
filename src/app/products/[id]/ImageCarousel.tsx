import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
    return (
        <Carousel className="text-center mx-14 max-w-80">
            <CarouselContent>
                {imageUrls.map((image, index) => {
                    return (
                        <CarouselItem key={index}>
                            <Image
                                src={image}
                                alt={`product-image-${index}`}
                                width={300}
                                height={200}
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

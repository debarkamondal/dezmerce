import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageCarousel({ imageUrls, category, id, className }: { imageUrls: string[], category: string, id: string, className: string }) {
    return (
        <Carousel
            className={className}
            opts={{
                loop: true
            }}>
            <CarouselContent>
                {imageUrls.map((image, index) => {
                    return (
                        <CarouselItem key={index} className="h-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_S3_URL}/products/${category}/${id}/${image}`}
                                alt={`product-image-${index}`}
                                width={300}
                                height={200}
                                className="size-auto mx-auto rounded-md"
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex md:ml-2 xl:ml-4" />
            <CarouselNext className="hidden md:flex md:ml-2 xl:mr-4" />
        </Carousel>
    )
}

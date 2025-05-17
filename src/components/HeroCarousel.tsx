"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type CarouselData = {
  hook: string;
  category: string;
  price: number;
  thumbnail: string;
  link: string;
};

const HeroCarousel = (props: { carouselData: CarouselData[] }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {props.carouselData.map((item) => {
          return (
            <CarouselItem key={item.thumbnail}>
              <Link href={item.link} className="cursor-pointer">
                <div className="relative flex items-center justify-evenly overflow-hidden">
                  <div className="text-secondary md:text-primary from-primary/80 absolute bottom-0 left-0 w-full overflow-hidden rounded-md rounded-bl-xl bg-linear-to-r to-70% p-4 md:static md:grow-0 md:space-y-4 md:bg-none">
                    <p className="text-xl font-light md:mx-4 md:text-4xl">
                      {item.hook}
                    </p>
                    <p
                      className={`font-alex-brush text-5xl font-normal md:text-9xl`}
                    >
                      {item.category}
                    </p>
                    <p className="font-medium md:mx-4">
                      Starting from &#8377; {item.price}*{" "}
                    </p>
                    <Button className="bg-secondary md:bg-primary mt-2 h-16 w-16 rounded-full">
                      <ChevronRight className="text-primary md:text-secondary size-8" />
                    </Button>
                  </div>
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${item.thumbnail}`}
                    height={900}
                    width={800}
                    alt="hero-image-1"
                    className="w-full rounded-xl md:w-72 lg:min-w-96"
                  />
                </div>
              </Link>
            </CarouselItem>
          );
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
              <div className="flex h-full flex-col items-center justify-center gap-12 px-2 text-center">
                <p className="text-5xl">Want this website for </p>
                <span className={`font-alex-brush text-8xl md:text-9xl`}>
                  Yourself?
                </span>
                <p className="text-xl">You can host it yourself or hire me</p>
                <div className="flex items-center space-x-8">
                  <Button className="h-12 w-32 font-bold">
                    <span>Github</span>
                    <Image
                      src={"/github-logo.svg"}
                      height="20"
                      width="20"
                      alt="github-icon"
                      className="invert"
                    />
                  </Button>
                  <Button className="h-12 w-32 font-bold">Contact Me</Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="mx-8 hidden p-2 lg:block xl:mx-0" />
      <CarouselNext className="mx-8 hidden p-2 lg:block xl:mx-0" />
    </Carousel>
  );
};
export default HeroCarousel;

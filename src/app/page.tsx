import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";

const carouselData = [
  {
    hook: "Latest releases for",
    category: "Women",
    price: 999,
    image: "/hero-1.jpg",
  },
  {
    hook: "Latest releases for",
    category: "Men",
    price: 999,
    image: "/hero-2.jpg",
  },
  {
    hook: "Latest releases for",
    category: "Angles",
    price: 999,
    image: "/hero-3.jpg",
  },
];

const topCollection = [
  {
    id: "1",
    title: "Black Bobber Jacket",
    image: "https://m.media-amazon.com/images/I/61YHIjqyyxL._SY879_.jpg",
    url: "/products/1",
    price: 2500,
  },
  {
    id: "2",
    title: "'Wolver' Men's Slim Fit Casula Blazer",
    image: "https://m.media-amazon.com/images/I/71SOJLGt4NL._SY879_.jpg",
    url: "/products/1",
    price: 500,
  },
  {
    id: "3",
    title: "Nike Men's Free Metcon 6",
    image: "https://m.media-amazon.com/images/I/715T+4gyZuL._SX695_.jpg",
    url: "/products/1",
    price: 500,
  },
  {
    id: "4",
    title: "Long skirt Bohemian Style Animal Print",
    image: "https://m.media-amazon.com/images/I/51s31jd2UGL.jpg",
    url: "/products/1",
    price: 500,
  },
];

const marvelCollection = [
  {
    id: "4",
    title: "Venom: Spider x Venomi T-shirt",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1729684355_9129367.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 499,
  },
  {
    id: "2",
    title: "Black Panther: The Suit",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1639399142_5592242.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 999,
  },
  {
    id: "3",
    title: "Avengers: Denim Jogger",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1669136060_5606366.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 749,
  },
  {
    id: "4",
    title: "Deadpool: Anti-Hero T-shirt",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/Deadpool--Anti-Hero-Oversized-T-Shirts-12024_07_23-22-41-54.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 1199,
  },
];

const dCCollection = [
  {
    id: "1",
    title: "Harley Quinn: Baddie Women oversized T-shirt",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1728626524_2529480.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 499,
  },
  {
    id: "2",
    title: "Harley Quinn: Crop Top",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1728295408_9922674.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 449,
  },
  {
    id: "3",
    title: "Colourblock Pullover: Superman",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1731665024_4273808.jpg?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 899,
  },
  {
    id: "4",
    title: "Batman: The Dark Knight Sneaker",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1699360430_5340006.gif?format=webp&w=480&dpr=1.8",
    url: "/products/1",
    price: 2999,
  },
];
export default function Home() {
  return (
    <div className="p-2 md:mt-4 md:px-8 xl:px-40">
      <HeroCarousel carouselData={carouselData} />
      <h2 className="text-primary font-alex-brush my-8 text-center text-4xl font-semibold md:text-6xl lg:my-16">
        Top Collection
      </h2>
      <ProductGrid products={topCollection} className="md:grid-cols-4" />
      <h2 className="text-primary font-alex-brush my-8 text-center text-4xl font-semibold md:text-6xl lg:my-16">
        Official Merch
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="rounded-md bg-red-100 p-4 md:w-1/2">
          <Image
            src="/marvel-logo.png"
            height="100"
            width="500"
            alt="Marvel-logo"
            className="mx-auto mb-4 w-32 object-fill"
          />
          <ProductGrid products={marvelCollection} />
        </div>
        <div className="rounded-md bg-blue-100 p-4 md:w-1/2">
          <Image
            src="/dc-logo.png"
            height="200"
            width="200"
            alt="DC-logo"
            className="mx-auto mb-4 w-14 object-fill"
          />
          <ProductGrid products={dCCollection} />
        </div>
      </div>
    </div>
  );
}

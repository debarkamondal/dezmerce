import HeroCarousel from "@/components/HeroCarousel";
import CardGrid from "@/components/ProductGrid";
import { category } from "@/lib/types";
import { getCategories } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const carouselData = [
  {
    hook: "Newly released",
    category: "Pants",
    price: 799,
    thumbnail: "pants.webp",
    link: "/category/pants",
  },
  {
    hook: "Newly released",
    category: "Skirts",
    price: 999,
    thumbnail: "skirt.webp",
    link: "/category/skirts",
  },
  {
    hook: "Newly released",
    category: "Perfumes",
    price: 999,
    thumbnail: "perfume.webp",
    link: "/category/perfume",
  },
];

const marvelCollection = [
  {
    id: "01JVEBC4PCHYJSVQDTCXJ4KRB7",
    category: "perfume",
    title: "Black Panther: The King ",
    thumbnail: "perfume5-1.webp",
    url: "/products/perfume-01JVEBC4PCHYJSVQDTCXJ4KRB7",
    price: 999,
  },
  {
    id: "01JVEB60AHWTPAT9F72MQVPKNB",
    category: "pants",
    title: "Thor: Mighty Avenger ",
    thumbnail: "pants5-1.webp",
    url: "/products/pants-01JVEB60AHWTPAT9F72MQVPKNB",
    price: 2199,
  },
  {
    id: "01JVEAZPFM4E2VTYZWD43WNQVD",
    category: "tshirt",
    title: "Truck Art: Iron Man ",
    thumbnail: "tshirt5-1.webp",
    url: "/products/tshirt-01JVEAZPFM4E2VTYZWD43WNQVD",
    price: 699,
  },
  {
    id: "01JVBRCDJW4BK20M0MECBZFTK1",
    category: "sneakers",
    title: "Deadpool: Utility Suit ",
    thumbnail: "sneakers4-1.webp",
    url: "/products/sneakers-01JVBRCDJW4BK20M0MECBZFTK1",
    price: 2599,
  },
];

const dCCollection = [
  {
    id: "01JVEDCK5TRCQJ04S2M01PQR53",
    category: "perfume",
    title: "Batman: Rebirth ",
    thumbnail: "perfume6-1.webp",
    url: "/products/perfume-Batman: Rebirth ",
    price: 899,
  },
  {
    id: "01JVECMMYPW056Z2HQKB12R10H",
    category: "pants",
    title: "Wonder Woman: Warrior (Wide Leg Fit) ",
    thumbnail: "pants6-1.webp",
    url: "/products/pants-01JVECMMYPW056Z2HQKB12R10H",
    price: 1599,
  },
  {
    id: "01JVECQMKBNXC00XV8BSXM41DK",
    category: "tshirt",
    title: "DC: Catwoman ",
    thumbnail: "tshirt6-1.webp",
    url: "/products/tshirt-01JVECQMKBNXC00XV8BSXM41DK",
    price: 799,
  },
  {
    id: "01JVBR7V4J2NDM3RA6DP0EWENP",
    category: "sneakers",
    title: "Batman: The Dark Knight 2.0 ",
    thumbnail: "sneaker3-1.webp",
    url: "/products/sneakers-01JVBR7V4J2NDM3RA6DP0EWENP",
    price: 3399,
  },
];
export default async function Home() {
  const categories: Record<string, category> = await getCategories();
  return (
    <div className="p-2 md:mt-4 md:px-8 xl:px-40">
      <HeroCarousel carouselData={carouselData} />
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
          <CardGrid products={marvelCollection} />
        </div>
        <div className="rounded-md bg-blue-100 p-4 md:w-1/2">
          <Image
            src="/dc-logo.png"
            height="200"
            width="200"
            alt="DC-logo"
            className="mx-auto mb-4 w-14 object-fill"
          />
          <CardGrid products={dCCollection} />
        </div>
      </div>
      <h2 className="text-primary font-alex-brush my-8 text-center text-4xl font-semibold md:text-6xl lg:my-16">
        Our Categories
      </h2>
      <div className="grid grid-cols-2 items-center gap-2 md:grid-cols-4 lg:gap-4">
        {Object.keys(categories).map((category, index) => (
          <Link
            href={`/category/${category}`}
            key={category}
            className={`${Object.keys(categories).length - 1 === index ? "col-span-full justify-self-center md:w-fit" : ""} border-secondary bg-background rounded-md border shadow`}
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${categories[category].image}`}
              height={300}
              width={150}
              alt={"product-thumbnail"}
              className="m-auto size-44 rounded-md object-scale-down pt-2 md:size-60 lg:size-80"
            />
            <div className="mt-2 rounded-b-md bg-gray-100 px-4">
              <p className="truncate font-semibold capitalize">{category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

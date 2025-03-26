import HeroCarousel from "@/components/HeroCarousel";


const carouselData = [
    {
        hook: "Latest releases for",
            category: "Women",
        price: 999,
        image: "/hero-1.jpg"
    },
    {
        hook: "Latest releases for",
            category: "Men",
        price: 999,
        image: "/hero-2.jpg"
    },
    {
        hook: "Latest releases for",
            category: "Angles",
        price: 999,
        image: "/hero-3.jpg"
    }
]
export default function Home() {
    return (
        <div className="mt-4 md:mt-8">
            <HeroCarousel carouselData={carouselData}/>
        </div>
    );
}

import ProductGrid from "@/components/ProductGrid"

type SearchParams = Promise<{ search: string | string[] | undefined }>

const products = [
    {
        title: "Esp32 8MB ROM",
        image: "https://m.media-amazon.com/images/I/61YX-zoj9JL._SL1000_.jpg",
        url: "/products/1",
        price: 500
    },
    {
        title: "Esp32 8MB ROM",
        image: "https://m.media-amazon.com/images/I/61YX-zoj9JL._SL1000_.jpg",
        url: "/products/1",
        price: 500
    },
    {
        title: "Esp32 8MB ROM",
        image: "https://m.media-amazon.com/images/I/61YX-zoj9JL._SL1000_.jpg",
        url: "/products/1",
        price: 500
    },
    {
        title: "Esp32 8MB ROM",
        image: "https://m.media-amazon.com/images/I/61YX-zoj9JL._SL1000_.jpg",
        url: "/products/1",
        price: 500
    },
]
const SearchPage = async (props: { searchParams: SearchParams }) => {
    const { search } = await props.searchParams
    return (
        <div className="mx-5">
            <p className="text-lg md:text-xl lg:text-center my-4 lg:my-8 font-semibold">Showing results for: &ldquo;{search}&rdquo;</p>
            <ProductGrid products={products} />
        </div>
    )
}
export default SearchPage

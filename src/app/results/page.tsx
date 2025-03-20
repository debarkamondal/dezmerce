import Image from "next/image"
import Link from "next/link"

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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-4 gap-2">
                {products.map((product, index) =>
                    <Link href={product.url} key={index} className="p-2 border border-secondary shadow rounded-md">
                        <Image src={product.image} height={150} width={150} alt={"product-thumbnail"} className="m-auto"/>
                        <p className="font-semibold">{product.title}</p>
                        <span>&#8377;{product.price}</span>
                    </Link>
                )}
            </div>
        </div>
    )
}
export default SearchPage

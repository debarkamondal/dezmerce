import { CartItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
const ProductGrid = (props: { products: CartItem[], className?: string }) => {
    return (
        <div className={cn("grid grid-cols-2 lg:gap-4 gap-2", props.className)}>
            {props.products.map((product, index) =>
                <Link href={`/products/${product.id}`} key={index} className="border border-secondary shadow rounded-md bg-background">
                    <Image src={product.image} height={300} width={150} alt={"product-thumbnail"} className="pt-2 m-auto size-44 md:size-60 lg:size-80 object-scale-down" />
                    <div className="p-4 mt-2 bg-gray-100 rounded-b-md">
                        <p className="font-semibold truncate">{product.title}</p>
                        <span>&#8377;{product.price}</span>
                    </div>
                </Link>
            )}
        </div>
    )
}
export default ProductGrid

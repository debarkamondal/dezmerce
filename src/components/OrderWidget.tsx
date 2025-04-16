import Image from "next/image"

const OrderWidget = () => {
    return (
        <div className="m-4">
            <div className="overflow-scroll h-96 md:grid md:grid-cols-2">
                <h3 className="font-semibold sticky top-0 text-lg bg-background z-20 col-span-2">Pending</h3>
                {[1, 2, 3, 4, 5].map((index) => {
                    return (<div key={index} className="z-10">
                        <div className="relative h-28 flex gap-2 shadow p-2 rounded-md my-2">
                            <Image src="/about-1.jpg" height={300} width={200} alt="test-img" className="size-24 rounded-md" />
                            <div className="m-2 mb-4 justify-start flex flex-col">
                                <p className="font-semibold mb-2">Test Title</p>
                                <p className="mx-2 text-sm font-light">6x items</p>
                                <p className="mx-2 text-sm font-light">Pincode: 741201</p>
                            </div>
                            <span className="absolute right-3 bottom-3 font-semibold">&#8377; 400</span>
                        </div>
                    </div>
                    )
                })}
                <h3 className="font-semibold sticky top-0 text-lg bg-background z-20 col-span-2">Returned</h3>
                {[1, 2, 3, 4, 5].map((index) => {
                    return (<div key={index} className="z-10">
                        <div className="relative h-28 flex gap-2 shadow p-2 rounded-md my-2">
                            <Image src="/about-1.jpg" height={300} width={200} alt="test-img" className="size-24 rounded-md" />
                            <div className="m-2 mb-4 justify-start flex flex-col">
                                <p className="font-semibold mb-2">Test Title</p>
                                <p className="mx-2 text-sm font-light">6x items</p>
                                <p className="mx-2 text-sm font-light">Pincode: 741201</p>
                            </div>
                            <span className="absolute right-3 bottom-3 font-semibold">&#8377; 400</span>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
export default OrderWidget

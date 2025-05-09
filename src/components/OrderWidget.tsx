import Image from "next/image";

const OrderWidget = () => {
  return (
    <div className="m-4">
      <div className="h-96 overflow-scroll md:grid md:grid-cols-2">
        <h3 className="bg-background sticky top-0 z-20 col-span-2 text-lg font-semibold">
          Pending
        </h3>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <div key={index} className="z-10">
              <div className="relative my-2 flex h-28 gap-2 rounded-md p-2 shadow">
                <Image
                  src="/about-1.jpg"
                  height={300}
                  width={200}
                  alt="test-img"
                  className="size-24 rounded-md"
                />
                <div className="m-2 mb-4 flex flex-col justify-start">
                  <p className="mb-2 font-semibold">Test Title</p>
                  <p className="mx-2 text-sm font-light">6x items</p>
                  <p className="mx-2 text-sm font-light">Pincode: 741201</p>
                </div>
                <span className="absolute right-3 bottom-3 font-semibold">
                  &#8377; 400
                </span>
              </div>
            </div>
          );
        })}
        <h3 className="bg-background sticky top-0 z-20 col-span-2 text-lg font-semibold">
          Returned
        </h3>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <div key={index} className="z-10">
              <div className="relative my-2 flex h-28 gap-2 rounded-md p-2 shadow">
                <Image
                  src="/about-1.jpg"
                  height={300}
                  width={200}
                  alt="test-img"
                  className="size-24 rounded-md"
                />
                <div className="m-2 mb-4 flex flex-col justify-start">
                  <p className="mb-2 font-semibold">Test Title</p>
                  <p className="mx-2 text-sm font-light">6x items</p>
                  <p className="mx-2 text-sm font-light">Pincode: 741201</p>
                </div>
                <span className="absolute right-3 bottom-3 font-semibold">
                  &#8377; 400
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrderWidget;

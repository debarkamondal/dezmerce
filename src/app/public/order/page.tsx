import { cookies } from "next/headers";
import PaymentButton from "./PaymentButton";
import { Info } from "lucide-react";
import { userOrder } from "@/lib/types";

const PaymentPage = async () => {
  const url = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}`;
  const cookieStore = await cookies();
  const data = await fetch(`${url}/orders`, {
    headers: {
      ["order-token"]: cookieStore.get("order")?.value as string,
    },
  });
  const orderInfo: userOrder = await data.json();
  return (
    <main className="text-primary mx:mx-12 md:grid md:grid-cols-2">
      <h1 className="text-center text-2xl font-semibold md:col-span-2 md:my-8 md:text-left md:text-5xl xl:mb-16">
        {orderInfo.status === "initiated" ? "Pay" : "Order Status"}
      </h1>
      <section>
        <h2 className="mt-2 flex justify-between text-xl font-semibold">
          Order
          <p className="bg-primary text-secondary ml-2 inline-flex h-8 items-center gap-2 rounded-md px-2 py-1 text-base font-semibold md:mr-16">
            <Info size={16} strokeWidth={3} />
            <span>
              {orderInfo.status?.charAt(0).toUpperCase() +
                orderInfo.status?.substring(1)}
            </span>
          </p>
        </h2>
        <p className="mx-2">
          <span className="font-medium">ID:</span> {orderInfo.id}
        </p>
        <p className="col-span-2 mt-2 text-lg font-semibold">Address</p>
        <div className="m-2">
          <p>{orderInfo.user.name}</p>
          <p>{orderInfo.user.address.addressLine1}</p>
          <p>{orderInfo.user.address.addressLine2}</p>
          <p>{orderInfo.user.address.city}</p>
          <p>
            {orderInfo.user.address.state}, {orderInfo.user.address.pincode}
          </p>
          <p>{orderInfo.user.phone}</p>
          <p>{orderInfo.user.email}</p>
        </div>
      </section>
      <section>
        <div>
          <h2 className="my-2 text-lg font-semibold">Items</h2>
          <div className="mx-2">
            {Object.keys(orderInfo.items).map((key) => {
              const item = orderInfo.items[key];
              return (
                <div key={key} className="flex justify-between text-base">
                  <div>
                    <p>{item.title}</p>
                    <p className="text-sm font-bold">
                      {item.price}x{item.qty}
                    </p>
                  </div>
                  <span className="self-center text-base">
                    &#8377;{item.price * item.qty}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-primary mx-auto my-2 mt-4 h-px w-full" />
        <p className="mx-2 flex justify-between text-lg font-bold">
          <span>Total: </span>
          <span>&#8377;{orderInfo.total}</span>
        </p>
        <div className="bg-primary mx-auto my-2 h-px w-full" />
        {orderInfo.status !== "paid" && <PaymentButton />}
      </section>
    </main>
  );
};
export default PaymentPage;

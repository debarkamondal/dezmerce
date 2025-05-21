import PaymentButton from "./PaymentButton";
import { cookies } from "next/headers";

const OrderPage = async () => {
  const url = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}`;
  let paymentInfo = {};
  const cookieStore = await cookies();
  try {
    const data = await fetch(`${url}/orders`, {
      headers: {
        Authorization: cookieStore.get("auth")?.value as string,
      },
      method: "POST",
      body: JSON.stringify({}),
    });
    paymentInfo = await data.json();
  } catch (error) {}
  return (
    <div>
      <h1>Payment Page</h1>
      <PaymentButton paymentInfo={paymentInfo} />
    </div>
  );
};
export default OrderPage;

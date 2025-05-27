"use client";
import { Button } from "@/components/ui/button";
import { initiatePayment } from "@/lib/actions";
import Image from "next/image";
import Script from "next/script";

const PaymentButton = () => {
  const onSubmit = async () => {
    const paymentInfo = await initiatePayment();
    // const orderId = paymentInfo.description.split(":")[1];
    const options = {
      key: process.env.NEXT_PUBLIC_PAYMENT_GW_KEY_ID,
      currency: "INR",
      name: "Dezmerce",
      image: "https://www.dkmondal.in/favicon.ico",
      callback_url: "https://api.dkmondal.in/test/payments",
      theme: {
        color: "#d94167",
        backdrop: "#f5d3db",
      },
      ...paymentInfo,
    };

    //@ts-expect-error Razorpay does exists since the sicript is loaded in client component window and Razorpay creates linting problems
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        id="razorpay"
      />
      <Button className="my-2 w-full md:my-4" onClick={onSubmit}>
        Pay with Razorpay
        <Image
          src="/razorpay-logo.png"
          alt="razorpay-logo"
          height={30}
          width={30}
          className="size-6 invert"
        />
      </Button>
    </div>
  );
};
export default PaymentButton;

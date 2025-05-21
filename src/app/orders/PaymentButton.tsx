"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Script from "next/script";

const PaymentButton = ({
  paymentInfo,
}: {
  paymentInfo: Record<string, any>;
}) => {
  const onSubmit = () => {
    const orderId = paymentInfo.description.split(":")[1];
    let options = {
      key: process.env.NEXT_PUBLIC_PAYMENT_GW_KEY_ID,
      currency: "INR",
      name: "Dezmerce",
      image: "https://www.dkmondal.in/favicon.ico",
      callback_url: "https://api.dkmondal.in/test/payments/verify",
      // handler: function (response: Record<string, any>) {
      //   console.log(response);
      //   redirect(`/orders/verify/${orderId}`);
      // },
      ...paymentInfo,
    };
    let rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };
  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        id="razorpay"
      />
      <Button type="button" onClick={onSubmit}>
        Pay Now
      </Button>
    </div>
  );
};
export default PaymentButton;

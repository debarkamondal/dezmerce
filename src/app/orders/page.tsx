"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import { useState } from "react";

const OrderPage = () => {
  const [amount, setAmount] = useState<number>();
  const onSubmit = () => {
    let options = {
      key: process.env.NEXT_PUBLIC_PAYMENT_GW_KEY_ID,
      amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Dezmerce",
      description: "Test Transaction",
      image: "https://www.dkmondal.in/favicon.ico",
      order_id: "order_QX69w6mYiF5WX6",
      callback_url: "http://localhost:3000/test",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Debarka Mondal", //your customer's name
        email: "test@dkmondal.in",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);
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
export default OrderPage;

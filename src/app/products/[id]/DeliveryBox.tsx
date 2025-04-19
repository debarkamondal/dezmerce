"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

//Delete the delay function when added fetcher
const delay = (delayMS: number) =>
    new Promise((resolve) => setTimeout(resolve, delayMS));
export default function DeliveryBox({
    defaultDelivery,
}: {
    defaultDelivery: string;
}) {
    const [deliveryDate, setDeliveryDate] = useState(defaultDelivery);
    const [isLoading, setIsLoading] = useState(false);
    const checkDelivery = async () => {
        setIsLoading(true);
        await delay(5000);
        setDeliveryDate("09Jan");
        setIsLoading(false);
    };
    return (
        <div className="text-sm text-left border border-foreground mt-2 p-2 px-4 rounded-md">
            <h2 className="text-center text-lg font-semibold underline">
                Delivery Information
            </h2>
            <div className="my-2">
                Would be delivered to <b>110011</b> by :{" "}
                <span className="font-semibold text-green-600">{`${deliveryDate.slice(0, 2)} ${deliveryDate.substring(2)}`}</span>{" "}
            </div>
            <span>Enter your PIN code to know the delivery date</span>
            <div className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Enter your pincode"
                    className="border border-foreground p-2 my-2 mr-2 rounded-md"
                />
                {isLoading && (
                    <Button onClick={checkDelivery} disabled className="w-16">
                        <Image
                            src="/spinner.svg"
                            height={20}
                            width={20}
                            alt="loading-spinner"
                            className="invert"
                        />
                    </Button>
                )}
                {!isLoading && (
                    <Button onClick={checkDelivery} className="w-16">
                        Check!
                    </Button>
                )}
            </div>
        </div>
    );
}

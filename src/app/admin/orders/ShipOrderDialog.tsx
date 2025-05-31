"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shipOrder } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";

const ShipOrderDialog = ({
  orderId,
  email,
}: {
  orderId: string;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const action = async (form: FormData) => {
    const { status } = await shipOrder(
      form.get("tracking_id") as string,
      orderId,
      email,
    );
    if (status === "error") redirect("/402");
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-2 mt-4 w-full">Accept & Ship</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept & Ship</DialogTitle>
          <DialogDescription>
            Enter Tracking Id for consumer to track the consignment
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Input
            id="tracking-id-input"
            name="tracking_id"
            placeholder="Enter Tracking id"
          />
          <Label htmlFor="tracking-id-input" />
          <Button className="mt-4 w-full" typeof="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ShipOrderDialog;

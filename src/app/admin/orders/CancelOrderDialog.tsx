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
import { cancelOrder } from "@/lib/actions";
import { useState } from "react";

const CancelOrderDialog = ({
  orderId,
  email,
}: {
  orderId: string;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    await cancelOrder(orderId, email);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-2 mt-4 w-full" variant={"destructive"}>
          Cancel & Refund
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel & Refund</DialogTitle>
          <DialogDescription>
            This action is not reversible. The amount paid by the user will be
            refunded.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={handleClick}
        >
          Cancel & Refund
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default CancelOrderDialog;

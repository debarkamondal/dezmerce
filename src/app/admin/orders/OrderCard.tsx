import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { adminOrder } from "@/lib/types";
import { Info } from "lucide-react";
import ShipOrderDialog from "./ShipOrderDialog";
import CancelOrderDialog from "./CancelOrderDialog";

const OrderCard = ({ order }: { order: adminOrder }) => {
  const id = order.sk?.split(":")[1];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-border relative cursor-pointer rounded-md border p-4 shadow-sm">
          <p className="font-semibold">{id}</p>
          <p>{order.user.name}</p>
          <p>
            {order.user.address.state}, {order.user.address.pincode}
          </p>
          <p>{order.user.phone}</p>
          <p>{order.user.email}</p>
          <span className="absolute right-4 bottom-2 text-lg font-bold">
            &#8377; {order.total}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogHeader>
          <DialogTitle>
            <p>Order: </p>
            <p className="text-base">{id}</p>
          </DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <span className="text-xl font-semibold">{order.user.name}</span>
          <span className="bg-primary text-secondary ml-4 inline-flex h-7 items-center gap-2 rounded-md px-2 py-1 text-base font-semibold">
            <Info size={16} strokeWidth={3} />
            <span>
              {order.lsi.charAt(0).toUpperCase() + order.lsi.substring(1)}
            </span>
          </span>
          <p>
            {order.user.address.addressLine1}
            {order.user.address.addressLine2 !== "" && <br />}
            {order.user.address.addressLine2}
            <br />
            {order.user.address.city}
            <br />
            {order.user.address.state}, {order.user.address.pincode}
            <br />
            {order.user.phone}
            <br />
            {order.user.email}
            <br />
          </p>
          <p className="mt-2 font-semibold">
            Transaction Id:{" "}
            <span className="font-normal">{order.payment_id}</span>
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Items:</h2>
          <div className="bg-primary mx-auto mt-1 mb-2 h-px w-full" />
          {Object.keys(order.items).map((key, index) => {
            const item = order.items[key];
            return (
              <div key={key} className="flex justify-between text-base">
                <div>
                  <p>
                    {index + 1}. {item.title}
                  </p>
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
          <div className="bg-primary mx-auto my-2 mt-2 h-px w-full" />
        </div>
        <p className="mx-2 flex justify-between text-lg font-bold">
          <span>Total: </span>
          <span>&#8377;{order.total}</span>
        </p>
        {order.lsi !== "shipped" && order.user.email && (
          <ShipOrderDialog orderId={id} email={order.user.email} />
        )}
        {order.lsi !== "cancelled" && order.user.email && (
          <CancelOrderDialog orderId={id} email={order.user.email} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default OrderCard;

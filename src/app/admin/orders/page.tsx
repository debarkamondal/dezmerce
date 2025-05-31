import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminOrder, orderStatus } from "@/lib/types";
import OrderCard from "./OrderCard";

// const chartData = [
//   { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
//   { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
//   { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
//   { category: "Top", orders: 173, fill: "var(--color-top)" },
//   { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
// ];
//
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const orderStatuses: orderStatus[] = [
  "initiated",
  "paid",
  "shipped",
  "cancelled",
  "delivered",
];
const AdminPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const cookieStore = await cookies();
  const query = await searchParams;
  const url = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/admin/orders?status=${query.status || "paid"}`;

  const data = await fetch(url, {
    headers: {
      Authorization: cookieStore.get("auth")?.value as string,
    },
  });
  const orders: adminOrder[] = await data.json();
  return (
    <main>
      <h1 className="my-4 text-center text-2xl font-semibold md:text-3xl">
        Orders
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="mb-2 flex cursor-pointer items-center capitalize md:mb-4"
        >
          <Button variant={"outline"}>
            {query.status || "paid"} <ChevronDown size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="ml-2">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {orderStatuses.map((status) => {
            return (
              <Link key={status} href={`/admin/orders?status=${status}`}>
                <DropdownMenuItem
                  className={`capitalize ${(query.status || "paid") === status ? "font-bold" : "font-normal"}`}
                >
                  {status}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <section className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <OrderCard order={order} key={order.sk} />
        ))}
      </section>
    </main>
  );
};
export default AdminPage;

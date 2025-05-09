import OrderWidget from "@/components/OrderWidget";
import { Chart } from "@/components/Chart";

const chartData = [
  { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
  { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
  { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
  { category: "Top", orders: 173, fill: "var(--color-top)" },
  { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
];

const AdminPage = async () => {
  return (
    <main>
      <h1 className="my-4 text-center text-2xl font-semibold md:text-3xl">
        Orders
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Chart title="This month" data={chartData} />
        <div className="hidden md:block">
          <Chart title="This month" data={chartData} />
        </div>
      </div>
      <OrderWidget />
    </main>
  );
};
export default AdminPage;

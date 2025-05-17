import { Chart } from "@/components/Chart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CategoryForm from "@/components/forms/CategoryForm";
import { category } from "@/lib/types";
import { getCategories } from "@/lib/utils";

const chartData = [
  { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
  { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
  { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
  { category: "Top", orders: 173, fill: "var(--color-top)" },
  { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
];

const adminProducts = async () => {
  const categories: { [name: string]: category } = await getCategories();
  return (
    <main>
      <div className="mx-4 flex items-center justify-between">
        <h1 className="my-2 text-2xl font-semibold md:my-4 md:text-4xl">
          Dashboard
        </h1>
        <Button asChild>
          <Link href="/admin/dashboard/create/product">Add Product</Link>
        </Button>
      </div>
      <div className="mx-2">
        <Chart title="Inventory" data={chartData} />
      </div>
      <div className="mx-4 flex items-center gap-4">
        <h1 className="my-4 text-lg font-semibold">All Categories</h1>
        <CategoryForm>
          <Button className="size-8 cursor-pointer rounded-full">
            <Plus />
          </Button>
        </CategoryForm>
      </div>
      {Object.keys(categories).map((key: string) => {
        const category: category = categories[key];
        return (
          <div
            key={key}
            className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow"
          >
            <Link
              href={`/admin/category/${key}`}
              className="relative flex grow"
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${category.image}`}
                height={300}
                width={200}
                alt={`${key}-img`}
                className="size-24 rounded-md object-contain"
              />
              <div className="m-2 mb-4 flex grow flex-col justify-start">
                <p className="font-semibold capitalize">{key}</p>
                <p className="text-sm font-light capitalize">{}</p>
                <span className="mt-2">Qty: {category.qty}</span>
              </div>
            </Link>
          </div>
        );
      })}
    </main>
  );
};
export default adminProducts;

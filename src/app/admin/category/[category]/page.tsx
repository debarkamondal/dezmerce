import CategoryForm from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import { productMetadata } from "@/lib/types";
import { getCategories, getProductsByCategory } from "@/lib/utils";
import { Pencil, Plus, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/forms/ProductForm";
import DeleteProductButton from "./DeleteProductButton";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const categories = await getCategories();
  const products: productMetadata[] = await getProductsByCategory(category);
  return (
    <main>
      <section className="flex gap-4">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${categories[category].image}`}
          className="h-48 w-36 rounded-md"
          height="300"
          width="200"
          alt="Category image"
        />
        <div className="self-end">
          <h1 className="text-2xl font-semibold capitalize">{category}</h1>
          <p className="my-2 text-sm">(Qty: {categories[category].qty})</p>
          <div className="flex gap-2">
            <CategoryForm
              categoryData={categories[category]}
              initCategory={category}
            >
              <Button>
                <Pencil />
                Edit
              </Button>
            </CategoryForm>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  Product
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby="add product form"
                className="max-h-5/6 overflow-scroll"
              >
                <DialogHeader>
                  <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <ProductForm cats={categories} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      <h2 className="m-2 mt-8 text-xl font-semibold">All {category}s</h2>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow"
          >
            <Link
              href={`/products/${product.category}-${product.id}`}
              className="relative flex grow cursor-pointer"
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${product.category}/${product.id}/${product.thumbnail}`}
                height={300}
                width={200}
                alt={`${product.title}-img`}
                className="size-24 rounded-md object-contain"
              />
              <div className="m-2 mb-4 flex grow flex-col justify-start">
                <p className="font-semibold capitalize">{product.title}</p>
                <p className="text-sm font-light capitalize">{}</p>
                <span className="mt-2">Rs. {product.price}</span>
              </div>
            </Link>

            {/* TODO: Add update function */}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"destructive"} className="self-center">
                  <Trash2Icon />
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby="add product form"
                className="max-h-5/6 overflow-scroll"
              >
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_S3_URL}/products/${product.category}/${product.id}/${product.thumbnail}`}
                    height={300}
                    width={200}
                    className="mx-auto rounded-md"
                    alt={`${product.title}-img`}
                  />
                  <p className="text-xl font-semibold">{product.title}</p>
                  <DialogDescription>
                    Are you sure you want to delete this product?
                  </DialogDescription>
                  <DeleteProductButton
                    category={product.category}
                    id={product.id}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <Dialog> */}
            {/*   <DialogTrigger asChild> */}
            {/*     <Button className="self-center"> */}
            {/*       <Pencil /> */}
            {/*     </Button> */}
            {/*   </DialogTrigger> */}
            {/*   <DialogContent */}
            {/*     aria-describedby="add product form" */}
            {/*     className="max-h-5/6 overflow-scroll" */}
            {/*   > */}
            {/*     <DialogHeader> */}
            {/*       <DialogTitle>Edit Product</DialogTitle> */}
            {/*     </DialogHeader> */}
            {/*     <ProductForm */}
            {/*       cats={categories} */}
            {/*       id={product.category + "-" + product.id} */}
            {/*     /> */}
            {/*   </DialogContent> */}
            {/* </Dialog> */}
          </div>
        );
      })}
    </main>
  );
};
export default CategoryPage;

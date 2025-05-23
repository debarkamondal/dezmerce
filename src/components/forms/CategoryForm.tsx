"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { startTransition, useRef, useState } from "react";
import { addCategory, revalidatetag, updateCategory } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { category } from "@/lib/types";
import { useRouter } from "next/navigation";

type propType = {
  setCategories?: (action: string[]) => void;
  initCategory?: string;
  categoryData?: category;
  children?: React.ReactNode;
};

const CategoryForm = ({
  setCategories,
  initCategory,
  categoryData,
  children,
}: propType) => {
  const catImgRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState(initCategory ?? "");
  const [catImg, setCatImg] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    const payload: { category?: string; image?: string } = {};
    let image = catImgRef.current?.files ? catImgRef.current?.files[0] : null;

    //Optimistically update if setOptimistic action passed
    startTransition(() => {
      if (typeof setCategories === "function") setCategories([category]);
    });

    //Update category if form already initialized
    if (initCategory) {
      if (category && category !== initCategory)
        payload.category = category.toLowerCase();
      if (image?.name) payload.image = image.name;
      if (Object.keys(payload).length < 1) throw "Nothing to change";
      const { imgUrl } = await updateCategory(
        initCategory.toLowerCase(),
        payload,
      );
      if (image && imgUrl)
        await fetch(imgUrl, {
          method: "PUT",
          headers: { "Content-Type": image.type },
          body: image,
        });
    } else {
      if (!catImgRef.current?.files) return Error("No image uploaded");
      image = catImgRef.current?.files[0];
      const imgUrl = await addCategory(
        category.toLowerCase(),
        catImgRef.current?.files[0].name,
      );
      if (imgUrl)
        await fetch(imgUrl, {
          method: "PUT",
          headers: { "Content-Type": image.type },
          body: image,
        });
    }
    setIsLoading(false);
    revalidatetag("categories");
    setIsDialogOpen(false);
    if (category !== initCategory) router.push(`/admin/category/${category}`);
    setCatImg(null);
  };
  const imageUrl = categoryData
    ? `https://${process.env.NEXT_PUBLIC_S3_URL}/categories/${categoryData?.image}`
    : null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || <Button>Add category</Button>}
      </DialogTrigger>
      <DialogContent className="absolute mx-auto">
        <DialogTitle>
          <DialogHeader> Add Category</DialogHeader>
        </DialogTitle>
        <div className="flex flex-col gap-2">
          <Image
            src={catImg ?? imageUrl ?? "/upload-img.png"}
            className={`${catImg || imageUrl ? "size-36 p-0 shadow-none" : "size-16"} mx-auto rounded-md object-contain p-2 shadow drop-shadow`}
            height={100}
            width={100}
            alt="category image"
            onClick={() => catImgRef.current?.click()}
          />
          {!catImg && !imageUrl && (
            <span className="text-primary mb-2 text-center text-sm">
              Upload .jpg, .png, .webp
            </span>
          )}
          <Input
            type="file"
            hidden
            ref={catImgRef}
            onChange={(e) =>
              e.target.files !== null &&
              setCatImg(URL.createObjectURL(e.target.files[0]))
            }
          />
          <Input
            className="capitalize"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
          />
          <Button
            disabled={isLoading || (category === initCategory && !catImg)}
            type="button"
            onClick={handleClick}
          >
            {isLoading ? (
              <Image
                src="/spinner.svg"
                height={20}
                width={20}
                alt="loading spinner"
                className="invert"
              />
            ) : initCategory ? (
              "UpdateCategory"
            ) : (
              "Add Category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryForm;

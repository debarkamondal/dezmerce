"use client";
import { Button } from "@/components/ui/button";
import { deleteProduct, revalidatepath, revalidatetag } from "@/lib/actions";

const DeleteProductButton = ({
  category,
  id,
}: {
  category: string;
  id: string;
}) => {
  const handleClick = async () => {
    await deleteProduct(category, id);
    revalidatepath(`/admin/category/${category}`);
    revalidatetag(`categories`);
  };
  return (
    <Button variant={"destructive"} onClick={handleClick}>
      Delete
    </Button>
  );
};
export default DeleteProductButton;

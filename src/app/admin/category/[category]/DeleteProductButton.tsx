"use client";
import { Button } from "@/components/ui/button";
import { deleteProduct, revalidatepath } from "@/lib/actions";

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
  };
  return (
    <Button variant={"destructive"} onClick={handleClick}>
      Delete
    </Button>
  );
};
export default DeleteProductButton;

import { ProductForm } from "@/components/forms/ProductForm";
import ProductModal from "./ProductModal";

const ModalPage = async () => {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/categories`,
    { next: { tags: ["categories"] }, cache: "force-cache" },
  );
  const categories = await res.json();
  return (
    <ProductModal>
      <ProductForm cats={categories} />
    </ProductModal>
  );
};
export default ModalPage;

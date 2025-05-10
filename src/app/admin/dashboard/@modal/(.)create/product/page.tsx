import { ProductForm } from "@/components/forms/ProductForm";
import ProductModal from "./ProductModal";
import { getCategories } from "@/lib/utils";

const ModalPage = async () => {
  const categories = await getCategories()
  return (
    <ProductModal>
      <ProductForm cats={categories} />
    </ProductModal>
  );
};
export default ModalPage;

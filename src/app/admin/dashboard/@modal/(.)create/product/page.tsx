import ProductModal from "./ProductModal";
import { getCategories } from "@/lib/utils";

const ModalPage = async () => {
  const categories = await getCategories()
  return (
    <ProductModal categories={categories} />
  );
};
export default ModalPage;

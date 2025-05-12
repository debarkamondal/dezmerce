import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody } from "@/components/ui/table";

const ProductLoading = () => {
  return (
    <section>
      <Skeleton className="" />
      <main className="relative md:grid md:grid-cols-2 md:gap-8">
        <Skeleton className="mx-auto h-96 w-72" />
        <div className="mt-4 flex flex-col items-center gap-2 md:items-start">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-48 w-96" />
          <Skeleton className="h-24 w-48" />
          <Table className="mx-auto my-4 max-w-96 text-center md:my-8">
            <TableBody></TableBody>
          </Table>
          <p className="mx-2 text-left leading-6"></p>
        </div>
      </main>
    </section>
  );
};
export default ProductLoading;

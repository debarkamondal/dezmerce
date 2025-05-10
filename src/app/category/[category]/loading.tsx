
import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <main>
      <Skeleton className="m-2 mt-8 w-24 h-8" />
      <div className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow" >
        <div className="relative flex grow" >
          <Skeleton className="size-24 rounded-md" />
          <div className="m-2 mb-4 gap-2 flex grow flex-col justify-start">
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-12 h-4 rounded-md" />
          </div>
        </div>
      </div>
      <div className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow" >
        <div className="relative flex grow" >
          <Skeleton className="size-24 rounded-md" />
          <div className="m-2 mb-4 gap-2 flex grow flex-col justify-start">
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-12 h-4 rounded-md" />
          </div>
        </div>
      </div>
      <div className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow" >
        <div className="relative flex grow" >
          <Skeleton className="size-24 rounded-md" />
          <div className="m-2 mb-4 gap-2 flex grow flex-col justify-start">
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-12 h-4 rounded-md" />
          </div>
        </div>
      </div>
      <div className="my-2 flex min-h-24 gap-2 rounded-md p-2 shadow" >
        <div className="relative flex grow" >
          <Skeleton className="size-24 rounded-md" />
          <div className="m-2 mb-4 gap-2 flex grow flex-col justify-start">
            <Skeleton className="w-full h-6 rounded-md" />
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-12 h-4 rounded-md" />
          </div>
        </div>
      </div>
    </main>
  )
}

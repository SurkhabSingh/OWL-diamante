import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col w-4/5 h-full space-y-3">
      <Skeleton className="h-60 w-full mb-4 rounded-xl" />
      <div className="flex flex-col  w-full justify-between ">
        <div>
          <Skeleton className="h-5 mb-4 w-44 " />
          <Skeleton className="h-9 mb-2" />
         
        </div>
        <div className="flex mb-4 gap-x-5">
          {" "}
          <Skeleton className="h-4 mb-4 w-44 " />
          <Skeleton className="h-4 mb-2 w-12" />
        </div>
        <div className="flex gap-x-5">
          {" "}
          <Skeleton className="h-8 mb-4 w-52 " />
          <Skeleton className="h-8 mb-2 w-48" />
        </div>
      </div>
    </div>
  );
}

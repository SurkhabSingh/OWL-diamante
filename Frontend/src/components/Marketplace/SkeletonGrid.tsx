import { SkeletonCard } from "../common/SkeletonCard";

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:grid-rows-3  gap-12  place-items-center w-full">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-4/5 rounded-md border cursor-pointer h-[700px] mb-10  bg-background border-slate-400/10  p-4 dark:bg-neutral-900 `}
        >
          <SkeletonCard />
        </div>
      ))}
      ;
    </div>
  );
}

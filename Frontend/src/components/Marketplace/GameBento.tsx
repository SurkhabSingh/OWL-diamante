import ButtonArray from "./ButtonArray";
import { gsap } from "gsap";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export function GameBento() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["game-query"],
  });

  console.log();
  return (
    <div className="sm:grid w-full px-32  hidden grid-cols-4 mt-8 gap-10">
      {[...Array(4)].map((_, index) => (
        <div
          key={index + 1}
          className={`relative row-span-1  rounded-xl  bg-background  dark:bg-neutral-900 ${
            index === 3 ? "border-b border-gray-200" : "border-2"
          } ${index === 1 || index === 3 ? "col-span-3" : ""}
        
        ${index > 3 ? "hidden" : "visible"}`}
        >
          {isLoading ? (
            <div
              className={`relative row-span-1  rounded-xl  bg-background  dark:bg-neutral-900  ${
                index === 1 || index === 3 ? "col-span-3" : ""
              }
           ${index > 3 ? "hidden" : "visible"}`}
            >
              <Skeleton className="h-[100px]  w-full " />
            </div>
          ) : (
            <div className="flex flex-col sm:h-[75px] h-[200px] w-full relative justify-center shadow-2xl  text-center  rounded-sm lg:text-left">
              {index != 3 ? (
                <img
                  src={
                    !isLoading
                      ? data[
                          Math.round(gsap.utils.random(0, 150))
                        ]?.cover?.url.replace("t_thumb", "t_1080p")
                      : ""
                  }
                  className="  sm:h-[75px] opacity-85 hover:opacity-95 transition-opacity ease-in  w-full object-cover rounded-xl brightness-75"
                />
              ) : (
                <div className=" flex h-[100px] bg-gradient-to-t from-violet-700 via-transparent to-transparent rounded-lg opacity-85">
                  <ButtonArray />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

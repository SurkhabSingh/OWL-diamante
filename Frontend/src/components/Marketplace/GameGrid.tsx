import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useButtonStore } from "@/store/store";
import { v4 as uuidv4 } from "uuid";

import Games from "./Games";
import { getGames } from "@/api/games/getGames";
import { PaginationSection } from "./PaginationSection";
import { SkeletonGrid } from "./SkeletonGrid";
import axios from "axios";

// type fetchDataType = {
//   id: number;
//   cover: {
//     id: number;
//     url: string;
//   };
//   first_release_date: number;
//   name: string;
//   rating: number;
//   genres: string;

//   summary: string;
// };

export default function GameGrid() {
  const { buttonIndex }: any = useButtonStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(12);

  const transformData = (data: any[], buttonIndex: number) => {
    switch (buttonIndex) {
      case 0:
        return data.sort((a, b) => b.first_release_date - a.first_release_date);
      case 1:
        return data.sort(
          (a, b) => b.rating - a.rating && b.rating_count - a.rating_count
        );
    }
  };
  const gameData = useQuery({
    queryKey: ["game-query"],
    select: (data) => transformData(data, buttonIndex),
  });

  const handleMinting = async ({ price, name, image, id }: any) => {
    // console.log(, name);
    console.log("yes sukhu");
    const bodyLicense = {
      amount: price,
      assetName: id.toString(),
      image,
      license: uuidv4(),
      user: "SDV43QHIXC2QNZ3LKIQFVPLPA2RU7E62YLZJCEQSD7FSKTJ7MMG7JG4W",
    };
    console.log(bodyLicense);
    const response = await axios
      .post("http://localhost:3001/mint", bodyLicense)
      .then((result) => {
        console.log(result.data);
        return result.data;
      });
  };

  const { data, isLoading } = gameData;

  const games = data;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const slicedData = games?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col w-full pr-24 -ml-10 mb-12 items-center justify-center">
      {isLoading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid grid-rows-3 md:grid-rows-3 md:grid-cols-3 sm:grid-cols-2   gap-5 gap-y-8  place-items-center">
          {slicedData?.map(
            (
              element: {
                id: number;
                cover: { url: string };
                name: string;
                rating: number;
                genres: {
                  name: string;
                }[];
                first_release_date: number;
                summary: string;
              },
              index: number
            ) => (
              <Games
                key={index}
                index={element.id}
                url={element.cover.url}
                name={element.name}
                rating={element.rating}
                genres={element?.genres?.map((genre) => genre?.name).join(", ")}
                releaseDate={element?.first_release_date}
                summary={element?.summary}
                className={"w-4/5 rounded-md border cursor-pointer h-[700px] "}
                handleMinting={handleMinting}
              />
            )
          )}
        </div>
      )}

      <div className="flex items-center justify-center mt-10 mb-2 w-full ">
        <PaginationSection
          totalPosts={games?.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

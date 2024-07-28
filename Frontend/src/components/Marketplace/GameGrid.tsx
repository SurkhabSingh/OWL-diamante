import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useButtonStore } from "@/store/store";
import { v4 as uuidv4 } from "uuid";

import Games from "./Games";
import { getGames } from "@/api/games/getGames";
import { PaginationSection } from "./PaginationSection";
import { SkeletonGrid } from "./SkeletonGrid";
import axios from "axios";
import ManageToken from "../profile/ManageToken";
import { getRecommendations } from "@/api/games/getRecommendations";
import { p2pCall } from "@/api/games/p2pcall";
import { toast } from "react-toastify";

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
  const [resellGames, setResellGames] = useState();
  const [sellerAddress, setSellerAddresses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;
        const response = await p2pCall(marketplaceAddress);
        const data = response.data;
        console.log(data);

        const assets = data.balances
          .filter((balance: any) => balance.balance > 0)
          .map((balance: any) => balance.asset_code)
          .filter((asset: any) => asset !== undefined);
        console.log(assets);

        const issuerAddress = data.balances
          .filter((balance: any) => balance.balance > 0)
          .map((balance: any) => balance.asset_issuer)
          .filter((asset: any) => asset !== undefined);
        console.log(issuerAddress);

        setSellerAddresses(issuerAddress[0]);

        try {
          const gamesData1 = await getRecommendations(assets);
          console.log(gamesData1);
          console.log(sellerAddress);
          setResellGames(gamesData1);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [buttonIndex]);

  const transformData = (
    data: any[],

    buttonIndex: number
  ) => {
    switch (buttonIndex) {
      case 0:
        return data.sort((a, b) => b.first_release_date - a.first_release_date);
      case 1:
        return data.sort(
          (a, b) => b.rating - a.rating && b.rating_count - a.rating_count
        );
      case 2:
        return resellGames;
    }
  };
  const gameData = useQuery({
    queryKey: ["game-query"],
    select: (data) => transformData(data, buttonIndex),
  });
  const handleSelling = async ({ name, id }: any) => {
    const publicKey = sessionStorage.getItem("publicKey");
    const response = await axios.get(
      `http://localhost:3001/verify?publicKey=${publicKey}&key=cid:${id.toString()}`
    );

    console.log(response.data);

    const bodyLicense = {
      assetName: id.toString(),
      user: sessionStorage.getItem("secretKey")?.toString(),
      mainIssuer: response.data.info.userAddress.toString(),
      license: response.data.hash.toString(),
    };
    console.log(bodyLicense);
    const buy_response = await axios
      .post("http://localhost:3001/buy", bodyLicense)
      .then((result) => {
        console.log(result.data);
        return result.data;
      });
    if (buy_response.data.status == 200) {
      toast.success(`${name} is succesfully minted!`);
    } else {
      toast.success(`purchase failed`);
    }
  };
  const handleMinting = async ({ price, name, image, id }: any) => {
    // console.log(, name);

    const bodyLicense = {
      amount: price,
      assetName: id.toString(),
      image,
      license: uuidv4(),
      user: sessionStorage.getItem("secretKey")?.toString(),
      userAddress: sessionStorage.getItem("publicKey")?.toString(),
    };
    console.log(bodyLicense);
    const response = await axios
      .post("http://localhost:3001/mint", bodyLicense)
      .then((result) => {
        console.log(result.data);
        return result.data;
      });
    if (response.data.status == 200) {
      toast.success(`${name} is succesfully minted!`);
    } else {
      toast.success(`purchase failed`);
    }
  };

  const { data, isLoading } = gameData;

  const games = data;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const slicedData = games?.slice(firstPostIndex, lastPostIndex);
  console.log(sellerAddress);

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
                sellerAddress: string;
              },
              index: number
            ) => (
              <Games
                key={index}
                id={index}
                index={element.id}
                url={element.cover.url}
                name={element.name}
                rating={element.rating}
                genres={element?.genres?.map((genre) => genre?.name).join(", ")}
                releaseDate={
                  element?.first_release_date || element?.release_dates[0].date
                }
                summary={element?.summary}
                handleMinting={handleMinting}
                handleSelling={handleSelling}
                isSale={buttonIndex === 2 ? true : false}
                issuerAddress={sellerAddress}
                className={"w-4/5 rounded-md border cursor-pointer h-[700px] "}
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

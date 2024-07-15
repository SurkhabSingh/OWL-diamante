import { URLEndpoint } from "./getGames";

export const getRecommendations = async (
  id: number[] | string[] | number | string | undefined
) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  console.log(id);
  const response = await fetch(
    `${URLEndpoint}getRecommendations?token=fh3tb23zd0fffm87xhgyjxlojvf3z0&game_id=${id}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};

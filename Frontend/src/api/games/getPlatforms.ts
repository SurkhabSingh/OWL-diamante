import { URLEndpoint } from "./getGames";

export const getPlatforms = async (index: number[] | string[] | undefined) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getPlatform?token=fh3tb23zd0fffm87xhgyjxlojvf3z0&platforms=${index}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};

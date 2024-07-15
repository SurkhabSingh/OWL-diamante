import { URLEndpoint } from "./getGames";

export const getVideoById = async (id: number | string | undefined) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getVideos?token=fh3tb23zd0fffm87xhgyjxlojvf3z0&id=${id}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};

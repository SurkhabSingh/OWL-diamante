export const URLEndpoint = "http://localhost:8080/api/";

export const getGames = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getGames?token=fh3tb23zd0fffm87xhgyjxlojvf3z0`,
    requestOptions
  );

  const result = await response.json();
  console.log(result);
  return result;
};

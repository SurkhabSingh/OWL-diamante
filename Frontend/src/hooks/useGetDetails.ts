import { getGamesById } from "@/api/games/getGameById";
import { useQuery } from "@tanstack/react-query";

export function useGetDetails(id: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["game-details", { game_id: id }],
    queryFn: () => getGamesById(id),
    staleTime: 10000,
  });
  // console.log(data);
  return {
    data,
    isLoading,
  };
}

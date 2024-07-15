import { getVideoById } from "@/api/games/getVideos";
import { useQuery } from "@tanstack/react-query";

export function useGetVideos(id: any) {
  const { data: videoRef, isLoading } = useQuery({
    queryKey: ["game-video", { video_id: id }],
    queryFn: () => getVideoById(id),
    staleTime: 10000,
  });
  return { videoRef, isLoading };
}

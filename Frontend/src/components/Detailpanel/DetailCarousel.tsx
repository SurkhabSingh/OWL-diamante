import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import ReactPlayer from "react-player";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin({ array, link }: { array: any[]; link: any[] }) {
  const plugin = useRef(Autoplay({ delay: 20000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full bg-inherit text-primary rounded-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="rounded-2xl">
        {link?.map((element, index) => (
          <CarouselItem key={index} className="w-full rounded-2xl">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${element.video_id}`}
              controls={true}
              playing={index == 0 ? true : false}
              muted={true}
              width={850}
              height={500}
            />
          </CarouselItem>
        ))}
        {array?.map(
          (element: { url: string }, index: React.Key | null | undefined) => (
            <CarouselItem key={index} className="pl-6 text-white rounded-2xl">
              <img
                src={`${element.url.replace("thumb", "1080p")}`}
                className="object-cover aspect-video"
              />
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious className="bg-inherit" variant="default" />
      <CarouselNext className="bg-inherit" variant="default" />
    </Carousel>
  );
}

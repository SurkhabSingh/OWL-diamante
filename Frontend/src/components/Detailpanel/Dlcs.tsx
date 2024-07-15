import { Accordion, AccordionItem, Avatar, Button } from "@nextui-org/react";
import { getRecommendations } from "@/api/games/getRecommendations";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export default function DlcsComp({ detailsResponse, id }: any) {
  const dlcData = useQuery({
    queryKey: ["dlc", { gameId: id }],
    queryFn: () => getRecommendations(detailsResponse?.data[0].dlcs),
    enabled: !detailsResponse?.isLoading,
  });
  console.log(dlcData);

  return (
    <div>
      {!dlcData.data ||
      (dlcData.data.length === 1 && dlcData.data[0].status === 400) ? (
        <div className="font-urbanist text-3xl">
          No DLC's available for this game.
        </div>
      ) : (
        <section className="flex flex-col ">
          <span className="bg-gradient-to-r from-violet-400 text-transparent bg-clip-text text-4xl font-semibold font-inter text-left">
            DLC's:
          </span>
          <Accordion
            className="bg-[rgba(255,255,255,0.05)] rounded-xl font-inter"
            selectionMode="multiple"
          >
            {dlcData?.data?.map(
              (
                dlc: {
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  cover: { url: string | undefined };
                  summary:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  id: any;
                },
                index: Key | null | undefined
              ): any => (
                <AccordionItem
                  className="font-dm font-semibold tracking-widest"
                  key={index}
                  title={dlc.name}
                  aria-label={`Accordion ${index + 1}`}
                  startContent={
                    <Avatar color="primary" src={dlc?.cover?.url} />
                  }
                >
                  <section className="flex justify-between  items-center">
                    <span className="text-left font-inter font-light tracking-tight line-clamp-2 pl-6">
                      {dlc.summary}
                    </span>
                    <Link to={`/game/${dlc.id}`} className="ml-20">
                      <Button variant="faded" className="font-inter ">
                        CheckOut
                      </Button>
                    </Link>
                  </section>
                </AccordionItem>
              )
            )}
          </Accordion>
        </section>
      )}
    </div>
  );
}

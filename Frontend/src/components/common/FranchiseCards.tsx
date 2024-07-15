import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function FranchiseCards({ url, title, id }: any) {
  const navigate = useNavigate();
  return (
    <Card
      className=" bg-[rgba(255,255,255,0.02)] h-[200px] w-[200px] opacity-60 hover:opacity-90 hover:bg-[rgba(255,255,255,0.04)] transition-all ease-in delay-75"
      shadow="sm"
      isPressable
      onPress={() => navigate(`/game/${id}`)}
      isBlurred
      isFooterBlurred
    >
      <CardBody className="overflow-hidden p-0 ">
        <Image
          shadow="sm"
          radius="md"
          width="100%"
          alt={title}
          className="w-full object-cover "
          src={url?.replace("thumb", "1080p")}
        />
      </CardBody>
      <CardFooter className="text-small justify-between ">
        <b className="font-inter text-xs">{title}</b>
      </CardFooter>
    </Card>
  );
}

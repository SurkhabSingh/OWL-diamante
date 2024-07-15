import { useNavigate } from "react-router-dom";

export type DetailProps = {
  index: number;
  url: string;
  name: string;
};
export default function Card({ index, url, name }: DetailProps) {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      onClick={() => navigate(`/game/${index}`)}
      className={`w-[220px] h-[380px] rounded-md cursor-pointer divide-y-2 hover:bg-gray-600/25 hover:drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] opacity-85 hover:opacity-100 delay-75  transition-all ease-in-out `}
    >
      <img
        src={url?.replace("thumb", "1080p")}
        alt="Laptop"
        // onClick={() => navigate(`/game/${index}`)}
        className=" w-full rounded-t-md object-cover "
      />
      <div className="p-5 font-inter">
        <p className=" line-clamp-2 text-lg font-semibold font-jura">{name}</p>
      </div>
    </div>
  );
}

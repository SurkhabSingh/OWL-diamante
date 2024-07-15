import { useChatStore } from "@/store/store";
import { Button } from "@nextui-org/react";

export default function ChatHeader({ header }: { header: string }) {
  const { setInfo }: any = useChatStore();
  return (
      
    <button
      className="flex w-full  justify-start items-center py-4 px-4 bg-[gray]/25 rounded-sm hover:bg-gray-200/45 transition-all ease-in"
      onClick={() => setInfo(1)}
    >
      <img
        src="https://source.unsplash.com/gaming/600x600"
        className="object-cover h-10 w-10  rounded-full"
        alt=""
      />
      <span className="flex  font-dm text-left  px-4 font-bold text-2xl tracking-wider rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {header}
      </span>
      
    </button>
  );
}

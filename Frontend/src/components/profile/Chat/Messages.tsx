import { chat } from "@/utils/dummydata/chatdummyDb";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "@/store/store";
import { FaHeartCircleBolt } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChatInfo from "./ChatInfo";

export default function Messages() {
  const { user, setLastMessage }: any = useChatStore();

  return (
    <div className="w-full flex flex-col border-x-2 border-slate-500/55 border-spacing-5 rounded-md px-4  justify-between">
      {user.active === -1 ? (
        <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
          <FaHeartCircleBolt className="text-5xl text-red-400" />
          <span className="text-3xl font-dm font-extrabold tracking-widest">
            Click to begin <span className="text-violet-400">Chatting!</span>
          </span>
        </div>
      ) : (
        <div className="h-[600px] w-full">
          <Dialog>
            <DialogTrigger className="w-full">
              <ChatHeader header={user.header} />
            </DialogTrigger>
            <DialogContent >
              <ChatInfo />
            </DialogContent>
          </Dialog>

          <div className="flex flex-col mt-5 h-full pt-4">
            {chat[user.active].map((message, id) => (
              <div key={id}>
                {message.sender === "Me" ? (
                  <div className="flex justify-end mb-4">
                    <span className="mr-2 py-3 text-left px-12 bg-violet-400/75 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white w-fit">
                      {message.message}
                    </span>
                    <img
                      src="https://source.unsplash.com/flowers/500x500"
                      className={`object-cover  h-8 w-8 rounded-full`}
                      alt="user-pfp"
                    />
                  </div>
                ) : (
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/random/600x600"
                      className={`object-cover  h-8 w-8 rounded-full`}
                      alt="user-pfp"
                    />
                    <span className="ml-2 py-3 text-left px-12 bg-gray-400/25 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white w-fit">
                      {message.message}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-3 px-3 rounded-xl text-black"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

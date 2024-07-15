import { useChatStore } from "@/store/store";
import ChatInfo from "./ChatInfo";
import Messages from "./Messages";
import UsersList from "./UsersList";

export default function Chat() {
  const { user }: any = useChatStore();
  return (
    <section className="mx-auto flex h-[900px] py-16 pl-4 pr-12 rounded-2xl bg-gray-200/10  font-urbanist">
      {" "}
      <UsersList />
      <Messages />
      

    </section>
  );
}
{
  /* <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">GoingChat</div>
        <div className="w-1/2">
          <input
            type="text"
            name=""
            id=""
            placeholder="search IRL"
            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div> */
}

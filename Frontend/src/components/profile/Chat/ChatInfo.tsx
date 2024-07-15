import { useChatStore } from "@/store/store";
import { users } from "@/utils/dummydata/chatdummyDb";

export default function ChatInfo() {
  const { user }: any = useChatStore();
  return (
    <div className="w-full border-l-2 px-5 space-y-5">
      <div className="flex flex-col">
        <div className="font-semibold text-xl py-4">
          {users[user.active].name}
        </div>
        <img
          src="https://source.unsplash.com/random/700x700"
          className="object-cover w-96 rounded-xl h-60"
          alt=""
        />
        <div className="font-semibold py-4">Created 2024</div>
        <div className="font-light">{users[user.active].message}</div>
        <div className="font-semibold py-4 flex flex-col">
          {" "}
          <span>Members:</span>
          <ul className="list-disc space-y-2  px-2">
            <li className="font-light">Me</li>
            <li className="font-light ">other</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

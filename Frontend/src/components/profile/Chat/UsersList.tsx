import { useChatStore } from "@/store/store";
import { users } from "@/utils/dummydata/chatdummyDb";
import { useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { RiCheckDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function UsersList() {
  const { user, setUser }: any = useChatStore();
  console.log(user);
  return (
    <section className="flex flex-col w-2/5  mr-3 rounded-md  overflow-y-auto space-y-5">
      <div className="border-b-2 py-4 px-2">
        <input
          type="text"
          placeholder="search chatting"
          className="w-full bg-gray-300 py-2 px-3 rounded-xl text-black"
        />
      </div>
      {users.map((element, id) => (
        <button
          key={id}
          onClick={() => {
            setUser({ active: id, header: element.name });
          }}
          className={`flex flex-row py-4 px-2 justify-start ${
            id === user.active ? "bg-gray-500/25" : ""
          } items-center border-b-2 hover:bg-gray-500/25 transition-all ease-out rounded-lg`}
        >
          <div className="w-1/4">
            <img
              src={`https://source.unsplash.com/random/600x600`}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full space-y-1">
            <div className="text-lg font-semibold text-left">
              {element.name}
            </div>
            <span className="flex items-center text-gray-500 text-left ml-3">
              <RiCheckDoubleFill className="text-green-400/45 font-extralight    text-[18px]" />
              {element.message}
            </span>
          </div>
        </button>
      ))}
    </section>
  );
}

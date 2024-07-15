import { useChatStore, useSidebarStore } from "@/store/store";
import { users } from "@/utils/dummydata/chatdummyDb";
import { dummyStats } from "@/utils/dummydata/dummyGameData";

export default function Stats() {
  const { setButtonIndex } = useSidebarStore();
  const { setUser } = useChatStore();
  return (
    <section className="w-full flex bg-white/[0.045] backdrop-blur-lg rounded-lg px-12 py-24">
      <div className=" border-r-2 border-white/[0.18] border-spacing-4 flex-1 p-4 rounded-md  hover:bg-white/[0.03] hover:transition-all hover:duration-700 hover:ease-in-out  ">
        <span className="text-3xl font-semibold tracking-tighter font-urbanist text-white mb-12">
          Your Stats
        </span>
        <ul className="list-disc flex flex-col gap-y-4 mt-12">
          {[...Array(5)].map((_, id) => (
            <li key={id} className="flex gap-x-2 items-center ml-24">
              <span className="text-xl tracking-tight   font-inter">
                {dummyStats[id]}:
              </span>
              <span className=" text-2xl font-jura text-green-500 font-semibold">
                {Math.floor(Math.random() * 3 + 1)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 ml-24">
        <span className="text-3xl font-semibold font-urbanist text-white">
          Groups
        </span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-12">
          {users.map((element, id) => (
            <button
              key={id}
              onClick={() => {
                setButtonIndex(1);
                setUser({ active: id, header: element.name });
              }}
              className="flex gap-x-4  rounded-lg p-4 hover:bg-white/[0.067] cursor-pointer hover:transition-y-1"
            >
              <img
                src="https://source.unsplash.com/150x150/?gaming"
                alt=""
                className=" object-cover self-center flex-shrink-0 w-24 h-24 border rounded-sm md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
              />
              <div className="flex flex-col gap-y-2">
                <span className="text-lg text-white font-urbanist text-left overflow-hidden">
                  {element.name}
                </span>
                <span className="text-xs text-white font-urbanist text-left">
                  {element.message}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

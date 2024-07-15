import { useSidebarStore } from "@/store/store";
import { profileSidebar } from "@/utils/dummydata/SidebarData";
import { Button } from "@nextui-org/react";

import { Link, useNavigate } from "react-router-dom";

import { IoCart, IoHome } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { CiViewList } from "react-icons/ci";

export default function Sidebar() {
  const { buttonIndex, setButtonIndex }: any = useSidebarStore();

  const navigate = useNavigate();


  const handleDisconnect = () => {
    disconnect();
    sessionStorage.setItem("current-user", undefined);
    navigate("/");
  };

  return (
    <section className="col-span-1 font-urbanist mt-12">
      <div className="flex flex-col h-screen p-3 w-60 dark:bg-gray-900 dark:text-gray-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between ">
            <h2 className="font-bold">Dashboard</h2>
            <button className="p-2"></button>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-8 text-sm ">
              {profileSidebar.map((element, id) => (
                <li
                  key={id}
                  className={`rounded-sm ${
                    id === buttonIndex
                      ? "bg-[gray]/[0.45] text-white text-base"
                      : "bg-inherit text-white text-base"
                  } `}
                  onClick={() => {
                    setButtonIndex(id);
                    console.log(buttonIndex);
                  }}
                >
                  <Link
                    rel="noopener noreferrer"
                    to=""
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <div>{displayIcons(id)}</div>
                    <span>{element}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleDisconnect()}
              className="flex w-full bg-[gray]/[0.45] text-white text-base tracking-wide "
            >
              <span className="w-28">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
function displayIcons(index: number) {
  switch (index) {
    case 0:
      return <IoHome className="text-blue-400 text-2xl font-extrabold" />;
    case 1:
      return (
        <IoIosChatbubbles className="text-violet-400 text-2xl font-extrabold" />
      );  
    case 2:
      return <IoCart className="text-yellow-400 text-2xl font-extrabold" />;
    case 3:
      return <CiViewList className="text-green-400 text-2xl font-extrabold" />;
      case 4:
      return <IoCart className="text-green-400 text-2xl font-extrabold" />;
  }
}

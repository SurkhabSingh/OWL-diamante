import { SidebarData } from "@/utils/dummydata/SidebarData";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <aside className="w-3/5  hidden  md:flex sm:flex flex-col basis-1/4  mb-10 pl-12 bg-[#181B1F] rounded-lg justify-left  text-left  ml-32 dark:bg-gray-900 dark:text-gray-100">
      {SidebarData.map((element, index) => (
        <nav key={index} className="space-y-8 mt-4 text-sm">
          <div className="space-y-2">
            <h2 className=" font-extrabold font-weight-800 tracking-wide font-dm uppercase text-violet-400 text-lg dark:text-gray-400">
              {element.header}
            </h2>

            {element.tags.sort().map((tag, tag_index) => (
              <ul key={tag_index} className="flex flex-col space-y-1">
                <li
                  rel="noopener noreferrer"
                  className="font-dm tracking-wide mb-1 font-semibold "
                >
                  <button>{tag}</button>
                </li>
              </ul>
            ))}
          </div>
        </nav>
      ))}
    </aside>
  );
}

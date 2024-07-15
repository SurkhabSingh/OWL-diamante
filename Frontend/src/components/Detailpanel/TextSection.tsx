import { Button } from "@nextui-org/react";
import DlcsComp from "./Dlcs";
import Franchise from "./Franchise";
import Platform from "./Platfrom";
import Languages from "./Languages";
// import Languages from "./Languages";

export default function TextSection({
  summary,
  id,
  detailsResponse,
}: {
  summary: string;
  id: any;
  detailsResponse: any;
}) {
  return (
    <section className="  px-2 py-10 grid grid-cols-4   gap-4 md:px-40 ">
      <figure className=" relative flex flex-col mx-auto col-span-3 text-balance justify-start ">
        <div className="mb-20">
          <DlcsComp id={id} detailsResponse={detailsResponse} />
        </div>
        <h1 className="mb-4  text-4xl  font-inter bg-gradient-to-t  from-blue-500 to-blue-300 text-transparent bg-clip-text  text-left tracking-wider font-semibold ">
          About the Game:
          <hr className="mt-2" />
        </h1>
        <blockquote className="mt-3 w-full text-left font-semibold text-lg font-jura text-white">
          <p>{summary}</p>
        </blockquote>
        <div className="mt-20 w-full">
          <Franchise id={id} detailsResponse={detailsResponse} />
        </div>
      </figure>
      <div className="relative bg-[rgba(255,255,255,0.05)] rounded-md pl-2 font-inter    bg-opacity-50 pb-6 col-span-1">
        <div className="upperDiv">
          <div>
            <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-5 mb-5">
              <span className="line-clamp-3 text-xl  text-left px-3">
                Is this game relevant to you?
              </span>
            </p>

            <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2">
              <span className=" text-md tracking-tighter text-left px-3">
                Sign in to see reasons why you may or may not like this based on
                your games, friends, and curators you follow.
              </span>
            </p>
          </div>

          <div className="mt-2 px-4 font-inter">
            <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2">
              <span className="text-violet-400 text-xs tracking-wider  ">
                Rating:
              </span>
              <span className="line-clamp-3 text-xs text-left">yo</span>
            </p>

            <p className="flex items-start w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2 ">
              <span className="text-violet-400 text-xs tracking-wider  ">
                Tags:
              </span>
              <span className="text-xs text-left">nah id win</span>
            </p>
          </div>
          <Button
            variant="ghost"
            className="  ml-5 bg-white flex items-center mt-4 w-4/5 rounded-sm  text-sm font-semibold text-black    outline hover:outline-offset-0"
          >
            Sign-In
          </Button>
        </div>
        <Platform id={id} detailsResponse={detailsResponse} />
        {/* <Languages id={id} detailsResponse={detailsResponse} /> */}
      </div>
    </section>
  );
}

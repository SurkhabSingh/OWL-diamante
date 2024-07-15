import React from "react";
import { genres } from "@/utils/dummydata/genreData";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function GenreTray() {
  gsap.registerPlugin(ScrollTrigger);

  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let t1 = gsap.timeline({
        scrollTrigger: {
          start: "top bottom",
          end: "bottom top",

          scrub: 4,
        },
      });
      t1.fromTo(
        ".genre-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 == 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-[99vw] mb-24" ref={component}>
      <header>
        <h1 className="text-4xl font-bold mb-5 leading tracking-tighter sm:text-6xl ">
          <span className="text-violet-400">Explore</span> amongst Thousands of{" "}
          <span className="">Genres:</span>
        </h1>
      </header>
      {genres.map((element, key) => (
        <div
          key={key}
          className=" genre-row flex  items-center justify-center gap-5 -mx-20 mb-4"
        >
          {[...Array(15)].map((_, i) => (
            <React.Fragment key={i}>
              <h1
                className="text-7xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: i === 7 ? "yellow" : "",
                  opacity: i === 7 ? "1" : "0.45",
                }}
              >
                {" "}
                {element}
              </h1>
              <span className="text-3xl opacity-45">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

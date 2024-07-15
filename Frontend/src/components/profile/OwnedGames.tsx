import { Divider } from "@nextui-org/react";
// import GameGrid from "../Marketplace/GameGrid";

export function OwnedGames() {
  return (
    <section className="mt-20">
      <span className="flex text-violet-400 text-4xl tracking-wider font-extrabold text-left">
        Your Games
      </span>

      <Divider className="text-2xl my-10 text-white" />
    </section>
  );
}

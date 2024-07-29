import { useEffect, useState } from "react";
import Card from "../Detailpanel/Cards";

import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const getData = async () => {
    const userID = JSON.parse(sessionStorage.getItem("current-user"))?.ID;

    const result = await axios.get(
      `http://localhost:8080/api/wish-list/${userID}?token=fh3tb23zd0fffm87xhgyjxlojvf3z0`
    );
    const games = result.data;
    setWishlist(games);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(wishlist);

  return (
    <section className="flex flex-col my-12 ">
      <h1 className="text-3xl text-left font-semibold font-urbanist tracking-wider mb-4 ">
        Your Wishlist :
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:grid-rows-3  gap-5  place-items-center">
        {wishlist?.map((game) => (
          <Card
            key={game.id}
            index={game.id}
            url={game.cover?.url}
            name={game.name}
          />
        ))}
      </div>
    </section>
  );
}

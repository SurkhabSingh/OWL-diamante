import { getRecommendations } from "@/api/games/getRecommendations";
import { useCartStore, useSidebarStore } from "@/store/store";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { removeFromCart } = useCartStore();
  const { setButtonIndex }: any = useSidebarStore();

  const navigate = useNavigate();

  const [cartGames, setCartGames] = useState([]);

  const Ids = JSON.parse(localStorage.getItem("cart"));

  const getData = async () => {
    const data = await getRecommendations(Ids);
    setCartGames(data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(cartGames);
  return (
    <div className="mx-auto flex flex-col space-y-8 p-6 px-12 rounded-2xl bg-gray-200/10 sm:p-16 sm:px-24">
      <h2 className="text-3xl font-urbanist font-bold">Your cart</h2>

      <ul className="flex flex-col font-urbanist w-full divide-y divide-gray-200">
        {cartGames?.map((element) => (
          <li
            key={element.id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 cursor-pointer flex-shrink-0 rounded object-cover outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={element.cover?.url}
                alt="no-img"
                onClick={() => navigate(`/game/${element.id}`)}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3
                      className="text-xl cursor-pointer font-semibold leading-snug sm:pr-8"
                      onClick={() => navigate(`/game/${element.id}`)}
                    >
                      {element?.name}
                    </h3>
                  </div>
                </div>
                <div className="flex divide-x gap-x-5 text-sm">
                  <Button
                    className="flex gap-x-5 bg-gray-200 hover:bg-red-200"
                    onClick={() => {
                      removeFromCart(element.id);
                      setButtonIndex(2);
                      window.location.reload();
                    }}
                  >
                    <FaTrash />
                    Remove
                  </Button>

                  <Button className="flex gap-x-5 bg-gray-200 hover:bg-red-200">
                    <FaHeart className="hover:text-red-600" />
                    Add to favorites
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        {/* <p>
          Total amount:
          <span className="font-semibold"> 0 eth</span>
        </p> */}
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="solid"
          onClick={() => navigate("/market")}
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Button>
        <Button
          type="button"
          variant="solid"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

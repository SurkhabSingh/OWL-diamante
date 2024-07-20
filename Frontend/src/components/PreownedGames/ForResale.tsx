import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

const ForResale = () => {
  const navigate = useNavigate();
  const [resales, setResales] = useState([]);

  useEffect(() => {
    const storedResales = JSON.parse(sessionStorage.getItem("resales")) || [];
    setResales(storedResales);
  }, []);

  return (
    <div className="mx-auto flex flex-col space-y-8 p-6 px-12 rounded-2xl bg-black sm:p-16 sm:px-24 min-h-[100vh]">
      <h2 className="text-3xl font-urbanist font-bold">P2P Market :</h2>

      <ul className="flex flex-col font-urbanist w-full divide-y divide-gray-200">
        {resales?.map((element, index) => (
          <li
            key={index}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 cursor-pointer flex-shrink-0 rounded object-cover outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={element.cover}
                alt="no-img"
                onClick={() => navigate(`/game/${element.id}`)}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="flex w-full justify-between items-center pb-4">
                    <h3
                      className="text-xl cursor-pointer font-semibold leading-snug sm:pr-8"
                      onClick={() => navigate(`/game/${element.id}`)}
                    >
                      {element?.name}
                    </h3>
                    <div className="flex flex-col">
                      <p className="text-l cursor-pointer font-semibold leading-snug sm:pr-8">
                        Wallet Address: <span>xxxxxxx567</span>
                      </p>
                      <p className="text-l cursor-pointer font-semibold leading-snug sm:pr-8">
                        Price: <span>{element.price} DIAM</span>
                      </p>
                      <Button type="button" variant="solid">
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex divide-x gap-x-5 text-sm"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right"></div>
      <div className="flex justify-end space-x-4">
        {/* <Button
          type="button"
          variant="solid"
          onClick={() => navigate("/market")}
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Button> */}
      </div>
    </div>
  );
};

export default ForResale;

import { getRecommendations } from "@/api/games/getRecommendations";
import { useEffect, useState } from "react";
import { p2pCall } from "@/api/games/p2pcall";
import Card from "../Detailpanel/Cards";
import { DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import ResaleForm from "../forms/ResaleForm";
import { Button } from "@nextui-org/react";
import { Dialog } from "@radix-ui/react-dialog";

const Inventory = () => {
  const [inventoryGames, setInventoryGames] = useState([]);
  const [cartGames, setCartGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isResaleModalOpen, setIsResaleModalOpen] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await p2pCall(sessionStorage.getItem("publicKey"));
      const assets = response.data.balances
        .filter((balance) => balance.balance > 0)
        .map((balance) => balance.asset_code)
        .filter((asset) => asset !== undefined);

      const inventoryData = await getRecommendations(assets);
      console.log(inventoryData);
      setInventoryGames(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openResaleModal = (game) => {
    setSelectedGame(game);
    setIsResaleModalOpen(true);
  };

  const closeResaleModal = () => {
    setSelectedGame(null);
    setIsResaleModalOpen(false);
  };

  return (
    <section className="flex flex-col my-12">
      <h1 className="text-3xl text-left font-semibold font-urbanist tracking-wider mb-4 -mt-8">
        INVENTORY:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:grid-rows-3 gap-5 place-items-center">
        {inventoryGames.map((game) => (
          <div key={game.id} className="card-wrapper">
            <Card index={game.id} url={game.cover.url} name={game.name} />
            <div className="flex divide-x gap-x-5 text-sm">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="flex gap-x-5 bg-gray-200 hover:bg-red-200"
                    onClick={() => openResaleModal(game)}
                  >
                    List
                  </Button>
                </DialogTrigger>
              </Dialog>

              {/* Uncomment and add functionality for Verify button if needed */}
              {/* <Button className="flex gap-x-5 bg-gray-200 hover:bg-red-200">
                Verify
              </Button> */}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1 text-right">
    
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
      </div>
      <ResaleForm
        selectedGame={selectedGame}
        open={isResaleModalOpen}
        setOpen={setIsResaleModalOpen}
      />
    </section>
  );
};

export default Inventory;

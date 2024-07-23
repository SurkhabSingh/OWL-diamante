import { useEffect } from "react";
import axios from "axios";
import { getRecommendations } from "@/api/games/getRecommendations";

const ManageToken = () => {
  useEffect(() => {
    async function fetchData() {
      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;
      console.log(marketplaceAddress);

      const reqOptions = {
        url: `https://diamtestnet.diamcircle.io/accounts/${marketplaceAddress}`,
        method: "GET",
        headers: headersList,
      };

      try {
        const response = await axios.request(reqOptions);
        const data = response.data;

        const assets = data.balances
          .map((balance) => balance.asset_code)
          .filter(Boolean);

        try {
          const gamesData = await getRecommendations(assets);
          console.log(gamesData);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return null;
};

export default ManageToken;

import { useEffect } from "react";
import axios from "axios";

const ManageToken = () => {
  useEffect(() => {
    async function fetchData() {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      const walletCode =
        "GCLQNVQW67IPAI6ZEEUZ3IXBSFLAZB4HD2OUDTQAH4MCXB3KRQUHJQKG";

      let reqOptions = {
        url: `https://diamtestnet.diamcircle.io/accounts/${walletCode}`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return null; // Component doesn't render anything
};

export default ManageToken;

import axios from "axios";

export const p2pCall = async (address: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const reqOptions = {
    url: `https://diamtestnet.diamcircle.io/accounts/${address}`,
    method: "GET",
    headers: headersList,
  };

  const response = await axios.request(reqOptions);

  console.log(response);
  return response;
};

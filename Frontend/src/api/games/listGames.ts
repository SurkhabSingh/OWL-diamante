import axios from "axios";

export const listNFT = async (
  user: string,
  gameID: number,
  license: string,
  amount: number
) => {
  await axios
    .post(`http://localhost:3001/list`, {
      user: `${user}`,
      assetName: `${gameID}`,
      license: `${license}`,
      amount: `${amount}`,
    })
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((err) => console.log(err));
};

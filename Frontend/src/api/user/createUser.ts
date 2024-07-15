import axios from "axios";
import { URLEndpoint } from "../games/getGames";

export const createUser = async (address: `0x${string}` | undefined) => {
  await axios
    .post(`${URLEndpoint}user`, { WalletAddress: address })
    .then((result) => {
      console.log(result.data);
      return result.data;
    })
    .catch((err) => console.log(err));
};

export const getAllUsers = async () => {
  try {
    const result = await axios.get(`${URLEndpoint}users`);
    return result.data;
  } catch (err) {
    return err;
  }
};

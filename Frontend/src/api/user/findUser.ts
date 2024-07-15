import axios from "axios";
import { URLEndpoint } from "../games/getGames";

export const findUser = async (id: number) => {
  await axios
    .get(`${URLEndpoint}user/${id}`)
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((err) => console.log(err));
};

import { URLEndpoint } from "../games/getGames";
import axios from "axios";

export const updateWishlist = async (
  wishlist,
  id: { wishlist: any[]; id: number }
) => {
  await axios
    .put(`${URLEndpoint}/user/${id}`, {
      wishList: wishlist,
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

import axios from "axios";
import { URLEndpoint } from "../games/getGames";

type updateUser = {
  user: {
    username: string;
    email: string;
    bio: string;
    tags: [string];
    picture: string;
    walletAddress: string | undefined;
    wishlist: any[];
  };
  id: number;
};
export const updateUser = async (
  { username, email, bio, tags, picture },
  id
) => {
  const publicKey = sessionStorage.getItem("publicKey");

  console.log(username, picture, id);
  await axios
    .put(`${URLEndpoint}user/${id}`, {
      username: username,
      email: email,
      Bio: bio,
      tags: tags,
      picture: picture,
      walletAddress: publicKey,
    })
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((err) => console.log(err));
};

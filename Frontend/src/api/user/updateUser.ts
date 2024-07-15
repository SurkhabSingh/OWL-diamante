import axios from "axios";
import { URLEndpoint } from "../games/getGames";


type updateUser = {
  user:{
  username: string;
  email: string;
  bio: string;
  tags: [string];
  picture: string;
  walletAddress: `0x${string}` | undefined;
  wishlist: any[];

  };
  id:number;
  
};
export const updateUser = async (
  { username, email, bio, tags, picture, walletAddress },
  id
) => {
  // const { address } = useAccount();

  console.log(username, picture, id);
  await axios
    .put(`${URLEndpoint}user/${id}`, {
      username: username,
      email: email,
      Bio: bio,
      tags: tags,
      picture: picture,
      walletAddress: walletAddress,
    })
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((err) => console.log(err));
};

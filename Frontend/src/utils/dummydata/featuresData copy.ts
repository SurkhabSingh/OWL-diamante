import blockchain from "../assets/lotties/blockchain.json";
import community from "../assets/lotties/community.json";
import nft from "../assets/lotties/nft.json";
import secure from "../assets/lotties/secure.json";
import fractional from "../assets/lotties/fractional.json";
export const owlFeatures: {
  id: string;
  heading: string;
  description: string;
  lottieData: any;
}[] = [
  {
    id: "1",
    heading: "Blockchain-Powered Marketplace",
    description:
      "Secure transactions with blockchain technology for transparent and reliable game transactions.",
    lottieData: blockchain,
  },
  {
    id: "2",
    heading: "Fractional Ownership Opportunities",
    description:
      "Democratize gaming investments with fractional ownership, making it accessible to a wider audience.",
    lottieData: fractional,
  },
  {
    id: "3",
    heading: "Dynamic NFTs for In-Game Assets",
    description:
      "Interactive gaming experiences with dynamic NFTs that evolve based on in-game achievements.",
    lottieData: nft,
  },
  {
    id: "4",
    heading: "Community-Driven Governance",
    description:
      "Empower users in decision-making through community-driven governance and blockchain voting mechanisms.",
    lottieData: community,
  },
  {
    id: "5",
    heading: "Secure and Decentralized Game Distribution",
    description:
      "Minimize risks with secure, decentralized game distribution, enhancing user control over gaming assets.",
    lottieData: secure,
  },
];

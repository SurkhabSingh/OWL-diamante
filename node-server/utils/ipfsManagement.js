// import axios from "axios";
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

exports.sendFileToIPFS = async (metadataToIpfs) => {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const response = await axios.post(url, metadataToIpfs, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    });
    console.log(`IPFS Hash: ${response.data.IpfsHash}`);
    // const ImgHash = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
    return response.data.IpfsHash;
  } catch (error) {
    console.log("Error sending File to IPFS: ");
    console.log(error);
  }
};

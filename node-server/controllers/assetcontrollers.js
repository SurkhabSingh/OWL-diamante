const { Keypair, Asset } = require("diamante-base");
const { Horizon } = require("diamante-sdk-js");
const {
  createTrust,
  transferAsset,
  transfer_money,
  fundAccount,
} = require("../utils/utilfunctions");
const { sendFileToIPFS } = require("../utils/ipfsManagement");
const axios = require("axios");

exports.mint = async (req, res) => {
  try {
    const { assetName, user, license, amount, image } = req.body;
    const ipfsHash = sendFileToIPFS({ assetName, license, image });
    const userKeypair = Keypair.fromSecret(user);
    const MARKET = Keypair.fromSecret(process.env.INTERMEDIATE_SECRET_KEY);
    const intermediateIssuer = Keypair.random();
    await fundAccount(intermediateIssuer);

    const asset = new Asset(assetName, intermediateIssuer.publicKey());

    console.log(assetName, intermediateIssuer.publicKey(), user, license);

    await createTrust(asset, intermediateIssuer, userKeypair).then(
      async (res) => {
        if (res.status === 200) {
          await transferAsset(
            assetName,
            asset,
            intermediateIssuer,
            userKeypair,
            ipfsHash
          ).then(async (res) => {
            if (res.status === 200) {
              await transfer_money(amount, userKeypair, MARKET);
            }
          });
        }
      }
    );
    res.send({
      status: 200,
      message: "Asset successfully minted!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Error in mint...",
    });
  }
};

exports.list = async (req, res) => {
  try {
    const { assetName, seller, license } = req.body;

    const MARKET = Keypair.fromSecret(process.env.INTERMEDIATE_SECRET_KEY);
    const seller_keypair = Keypair.fromSecret(seller);
    const intermediateIssuer = Keypair.random();
    await fundAccount(intermediateIssuer);

    const listing_price = "5";

    const asset = new Asset(assetName, seller_keypair.publicKey());

    const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
    const marketaccount = await server.loadAccount(MARKET.publicKey());

    console.log(marketaccount.balances);

    console.log(
      assetName,
      intermediateIssuer.publicKey(),
      seller_keypair.publicKey(),
      license
    );

    await createTrust(asset, seller_keypair, MARKET).then(async (res) => {
      if (res.status === 200) {
        await transferAsset(
          assetName,
          asset,
          seller_keypair,
          MARKET,
          license
        ).then(async (res) => {
          if (res.status === 200) {
            await transfer_money(listing_price, seller_keypair, MARKET);
          }
        });
      }
    });
    res.send({
      status: 200,
      message: "Asset successfully listed!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Error in mint...",
    });
  }
};
exports.buy = async (req, res) => {
  try {
    const { assetName, mainIssuer, user, license, amount } = req.body;
    const MARKET = Keypair.fromSecret(process.env.INTERMEDIATE_SECRET_KEY);

    const intermediateIssuer = Keypair.fromSecret(
      process.env.INTERMEDIATE_SECRET_KEY
    );

    console.log(assetName, intermediateIssuer.publicKey(), user, license);
    const mainIssuerKeypair = Keypair.fromSecret(mainIssuer);

    const userKeypair = Keypair.fromSecret(user);
    const asset = new Asset(assetName, mainIssuerKeypair.publicKey());

    //Transferring asset to user and collecting money
    await createTrust(asset, MARKET, userKeypair).then(async (res) => {
      if (res.status === 200) {
        await transferAsset(
          assetName,
          asset,
          MARKET,
          userKeypair,
          license
        ).then(async (res) => {
          if (res.status === 200) {
            await transfer_money(amount, userKeypair, mainIssuerKeypair);
          }
        });
      }
    });
    res.send({
      status: 200,
      message: "Asset successfully bought!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Error in buy...",
    });
  }
};

exports.verify = async (req, res) => {
  try {
    const { publicKey, key } = req.query;

    const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
    const account = await server.loadAccount(publicKey);

    const encodedData = account.data_attr[key];

    const decodedData = Buffer.from(encodedData, "base64").toString("utf-8");

    const decodedSecData = Buffer.from(decodedData, "base64").toString("utf-8");

    await axios
      .get(`https://ipfs.io/ipfs/${decodedSecData}`)
      .then((result) => {
        console.log(result.data);
        return res.send({
          data: result.data,
          status: 200,
          message: "metadata sent successfully",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Error in verify...",
    });
  }
};

const {
  Keypair,
  BASE_FEE,
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
  Transaction,
} = require("diamante-base");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Horizon } = require("diamante-sdk-js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");

const fundAccount = async (account) => {
  const response = await fetch(
    `https://friendbot.diamcircle.io/?addr=${account.publicKey()}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to activate account ${account.publicKey()}: ${response.status}`
    );
  }
  console.log(`Funded account: ${account.publicKey()}`);
};

const createTrust = async (assetName, issuingaccount, receivingaccount) => {
  try {
    const account = await server.loadAccount(receivingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
    })
      .addOperation(
        Operation.changeTrust({
          asset: new Asset(assetName, issuingaccount),
          limit: "10",
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(receivingaccount);
    const result = await server.submitTransaction(transaction);

    console.log("Issuer created and funded", result.hash);
  } catch (error) {
    console.error(
      "Error during user trustline and fee payment:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data && error.response.data.extras) {
      console.error(
        "Operation result codes:",
        error.response.data.extras.result_codes.operations
      );
    }
  }
};

const transferAsset = async (
  assetName,
  issuingaccount,
  receivingaccount,
  license
) => {
  try {
    const account = await server.loadAccount(issuingaccount.publicKey());

    const metadata = {
      license: license,
    };
    const metadataString = JSON.stringify(metadata);
    const encodedMetadata = Buffer.from(metadataString)
      .toString("base64")
      .slice(0, 64); // Ensure the metadata length is within 64 bytes

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
    })
      .addOperation(
        Operation.payment({
          destination: receivingaccount.publicKey(),
          asset: new Asset(assetName, issuingaccount.publicKey()),
          amount: "1",
        })
      )
      .addOperation(
        Operation.manageData({
          name: `cid:${assetName}`,
          value: encodedMetadata,
        })
      )
      .addOperation(
        Operation.setOptions({
          masterWeight: 0, // Set master weight to 0
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(issuingaccount);

    const result = await server.submitTransaction(transaction);
  } catch (error) {
    console.error(
      "Error during asset minting:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data && error.response.data.extras) {
      console.error(
        "Operation result codes:",
        error.response.data.extras.result_codes.operations
      );
    }
  }
};

const transfer_money = async (payingaccount, receivingaccount) => {
  try {
    const account = await server.loadAccount(payingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
    })
      .addOperation(
        Operation.payment({
          destination: receivingaccount.publicKey(),
          asset: Asset.native(),
          amount: "15",
        })
      )
      .setTimeout(150)
      .build();
    transaction.sign(payingaccount);
    const result = await server.submitTransaction(transaction);

    console.log("Success!", result.hash);
  } catch (error) {
    console.error(
      "Error during asset payment:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data && error.response.data.extras) {
      console.error(
        "Operation result codes:",
        error.response.data.extras.result_codes.operations
      );
    }
  }
};

const transfercuttinglist = async (payingaccount, receivingaccount) => {
  const listing_price = 5;
  try {
    const account = await server.loadAccount(payingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
    })
      .addOperation(
        Operation.payment({
          destination: receivingaccount.publicKey(),
          asset: Asset.native(),
          amount: (15 - listing_price).toString(),
        })
      )
      .setTimeout(250)
      .build();
    transaction.sign(payingaccount);
    const result = await server.submitTransaction(transaction);

    console.log("Success!", result.hash);
  } catch (error) {
    console.error(
      "Error during asset minting:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data && error.response.data.extras) {
      console.error(
        "Operation result codes:",
        error.response.data.extras.result_codes.operations
      );
    }
  }
};

app.post("/mint", async (req, res) => {
  try {
    const { assetName, mainIssuer, user, license } = req.body;

    const intermediateIssuer = Keypair.random();
    await fundAccount(intermediateIssuer);
    console.log(
      assetName,
      mainIssuer,
      intermediateIssuer.publicKey(),
      user,
      license
    );

    const mainIssuerKeypair = Keypair.fromSecret(mainIssuer);

    const userKeypair = Keypair.fromSecret(user);

    console.log(mainIssuerKeypair, userKeypair);

    // await createAsset(assetName, userKeypair, intermediateIssuer.publicKey());
    await createTrust(assetName, intermediateIssuer.publicKey(), userKeypair);
    await transferAsset(assetName, intermediateIssuer, userKeypair);

    await transfer_money(userKeypair, intermediateIssuer);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sell", async (req, res) => {
  try {
    const { assetName, mainIssuer, user, license } = req.body;

    const intermediateIssuer = Keypair.fromSecret(
      process.env.INTERMEDIATE_SECRET_KEY
    );
    const intermediateIssuer1 = Keypair.random();
    await fundAccount(intermediateIssuer1);

    console.log(
      assetName,
      mainIssuer,
      intermediateIssuer.publicKey(),
      user,
      license,
      "Intermediary acc 1:",
      intermediateIssuer1.publicKey()
    );
    const mainIssuerKeypair = Keypair.fromSecret(mainIssuer);

    const userKeypair = Keypair.fromSecret(user);
    //Transferring between main and intermediary1
    await createTrust(
      assetName,
      intermediateIssuer1.publicKey(),
      mainIssuerKeypair
    );
    await transferAsset(assetName, intermediateIssuer1, mainIssuerKeypair);

    //Transferring between intermediary1 and intermediate
    await createTrust(
      assetName,
      intermediateIssuer1.publicKey(),
      intermediateIssuer
    );
    await transferAsset(assetName, intermediateIssuer1, intermediateIssuer);

    //Transferring asset to user and collecting money
    await createTrust(assetName, intermediateIssuer, userKeypair);
    await transferAsset(assetName, intermediateIssuer, userKeypair);

    //payment
    await transfer_money(userKeypair, intermediateIssuer);
    await transfercuttinglist(intermediateIssuer, mainIssuerKeypair);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const {
  BASE_FEE,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
} = require("diamante-base");
const { Horizon } = require("diamante-sdk-js");

const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");

//Funding Account

exports.fundAccount = async (account) => {
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

//Establishing trust

exports.createTrust = async (asset, issuingaccount, receivingaccount) => {
  try {
    const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
    const account = await server.loadAccount(receivingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: asset,
          limit: "10",
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(receivingaccount);
    const result = await server.submitTransaction(transaction);

    console.log("Trust operation succeeded:", result.hash);
    return {
      status: 200,
      hash: result.hash,
    };
  } catch (error) {
    console.error(
      "Error during user trustline:",
      error.response ? error.response.data : error.message
    );
    return {
      status: 400,
      hash: "Error",
    };
  }
};

// Mint and Transfer

exports.transferAsset = async (
  assetName,
  asset,
  issuingaccount,
  receivingaccount,
  hash
) => {
  try {
    const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
    const account = await server.loadAccount(issuingaccount.publicKey());

    const metadata = {
      hash: hash,
    };
    const metadataString = JSON.stringify(metadata);
    const encodedMetadata = Buffer.from(metadataString)
      .toString("base64")
      .slice(0, 64);
    const receiverAddress = receivingaccount.publicKey();

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: receiverAddress,
          asset: asset,
          amount: "1",
        })
      )
      .addOperation(
        Operation.manageData({
          name: `cid:${assetName}`,
          value: encodedMetadata,
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(issuingaccount);

    const result = await server.submitTransaction(transaction);
    console.log("Minting asset transaction result:", result.hash);
    return {
      status: 200,
      hash: result.hash,
    };
  } catch (error) {
    console.error(
      "Error during user trustline:",
      error.response ? error.response.data : error.message
    );
    return {
      status: 400,
      hash: "Error",
    };
  }
};

//PAYMENTS

exports.transfer_money = async (amount, payingaccount, receivingaccount) => {
  try {
    const account = await server.loadAccount(payingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: receivingaccount.publicKey(),
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(150)
      .build();
    transaction.sign(payingaccount);
    const result = await server.submitTransaction(transaction);

    console.log("The payment is success!", result.hash);
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

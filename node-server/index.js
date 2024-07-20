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

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");

// Main issuer address (constant)
// Generate and store securely

// Function to create and fund accounts
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

// const userCreateIaAccount = async (user, intermediary, assetName) => {
//   try {
//     const account = await server.loadAccount(user.publicKey());
//     const transaction = new TransactionBuilder(account, {
//       fee: BASE_FEE,
//       networkPassphrase: "Diamante Testnet",
//     })
//       //   .addOperation(
//       //     Operation.createAccount({
//       //       destination: intermediary,
//       //       startingBalance: "4.00001", // since testnet base reserve is 1 DIAM
//       //     })
//       //   )
//       .addOperation(
//         Operation.changeTrust({
//           asset: new Asset(assetName, intermediary),
//           limit: "10",
//         })
//       )

//       .setTimeout(100)
//       .build();

//     transaction.sign(user);
//     const result = await server.submitTransaction(transaction);

//     console.log("User created a IA and funded:", result.hash);
//   } catch (error) {
//     console.log(error);
//     console.error(
//       "Error during user trustline and fee payment:",
//       error.response ? error.response.data : error.message
//     );
//     if (error.response && error.response.data && error.response.data.extras) {
//       console.error(
//         "Operation result codes:",
//         error.response.data.extras.result_codes.operations
//       );
//     }
//   }
// };

// Function to mint KYC asset to user from intermediate issuer
// const mintKycAsset = async (
//   assetName,
//   mainIssuer,
//   intermediateIssuer,
//   user,

// ) => {
//   try {
//     // Intermediate issuer mints the asset to the user
//     const account = await server.loadAccount(intermediateIssuer.publicKey());
//     const useraccount = await server.loadAccount(user.publicKey());
//     const metadata = {
//       issuerDID: mainIssuer.publicKey(), //just adding issuer address for demo
//       issuerDomain: "issuer.example.com",
//       userWallet: user.publicKey(),
//     };
//     const metadataString = JSON.stringify(metadata);
//     const encodedMetadata = Buffer.from(metadataString)
//       .toString("base64")
//       .slice(0, 64); // Ensure the metadata length is within 64 bytes

//     const transaction = new TransactionBuilder(account, {
//       fee: BASE_FEE,
//       networkPassphrase: "Diamante Testnet",
//     })
//       .addOperation(
//         Operation.payment({
//           destination: user.publicKey(),
//           asset: new Asset(assetName, intermediateIssuer.publicKey()),
//           amount: "1",
//         })
//       )
//       .addOperation(
//         Operation.manageData({
//           name: `cid:${assetName}`,
//           value: encodedMetadata,
//         })
//       )
//       .addOperation(
//         Operation.setOptions({
//           masterWeight: 0, // Set master weight to 0
//         })
//       )

//       .setTimeout(100)
//       .build();

//     transaction.sign(intermediateIssuer);

//     const result = await server.submitTransaction(transaction);

//     const user_transaction = new TransactionBuilder(useraccount, {
//       fee: BASE_FEE,
//       networkPassphrase: "Diamante Testnet",
//     })
//       .addOperation(
//         Operation.payment({
//           destination: intermediateIssuer.publicKey(),
//           asset: Asset.native(),
//           amount: "15",
//         })
//       )
//       .setTimeout(150)
//       .build();
//     user_transaction.sign(user);
//     const result2 = await server.submitTransaction(user_transaction);

//     console.log(
//       "Intermediate issuer minting KYC asset transaction result:",
//       result.hash,
//       "Payment successfull!",
//       result2.hash
//     );
//   } catch (error) {
//     console.log(error);
//     console.error(
//       "Error during asset minting:",
//       error.response ? error.response.data : error.message
//     );
//     if (error.response && error.response.data && error.response.data.extras) {
//       console.error(
//         "Operation result codes:",
//         error.response.data.extras.result_codes.operations
//       );
//     }
//   }
// };

const mintKycAsset = async (assetName, intermediateIssuer, user, CID) => {
  try {
    // Intermediate issuer mints the asset to the user
    const account = await server.loadAccount(intermediateIssuer.publicKey());
    const metadata = {
      //just adding issuer address for demo
      issuerDomain: "issuer.example.com",
      userWallet: user.publicKey(),
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
          destination: user.publicKey(),
          asset: new Asset(assetName, intermediateIssuer.publicKey()),
          amount: "0.0000001",
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

    transaction.sign(intermediateIssuer);
    const result = await server.submitTransaction(transaction);

    console.log(
      "Intermediate issuer minting KYC asset transaction result:",
      result.hash
    );
  } catch (error) {
    console.log(error);
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
const createTrust = async (asset, issuingaccount, receivingaccount) => {
  try {
    const account = await server.loadAccount(receivingaccount.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
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

    console.log("Main Issuer created a IA and funded:", result.hash);
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
  asset,
  issuingaccount,
  receivingaccount,
  assetName
) => {
  try {
    const account = await server.loadAccount(issuingaccount.publicKey());

    const metadata = {
      issuerDID: issuingaccount.publicKey(),
      issuerDomain: "issuer.example.com",
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
      .addOperation(
        Operation.setOptions({
          masterWeight: 0, // Set master weight to 0
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(issuingaccount);

    const result = await server.submitTransaction(transaction);

    console.log(
      "Intermediate issuer minting KYC asset transaction result:",
      result.hash
    );
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

const transfer_money = async (amount, payingaccount, receivingaccount) => {
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
          amount: amount.toString(),
        })
      )
      .setTimeout(150)
      .build();
    transaction.sign(payingaccount);
    const result2 = await server.submitTransaction(transaction);

    console.log("The payment is success!", result2.hash);
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

const list_game = async (asset, lister, marketplace, assetName) => {
  await createTrust(asset, lister, marketplace);
  await transferAsset(asset, lister, marketplace, assetName);

  const listing_price = 5;
  await transfer_money(listing_price, lister, marketplace);
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
    const result2 = await server.submitTransaction(transaction);

    console.log("The payment to main account success!", result2.hash);
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

const userCreateIaAccount = async (user, intermediary, assetName) => {
  try {
    const account = await server.loadAccount(user.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: "Diamante Testnet",
    })
      .addOperation(
        Operation.createAccount({
          destination: intermediary,
          startingBalance: "4.00001", // since testnet base reserve is 1 DIAM
        })
      )
      .addOperation(
        Operation.changeTrust({
          asset: new Asset(assetName, user.publicKey()),
          limit: "0.0000001",
        })
      )

      .setTimeout(100)
      .build();

    transaction.sign(user);
    const result = await server.submitTransaction(transaction);

    console.log("User created a IA and funded:", result.hash);
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

// Main function to run the entire process
const runProcess = async () => {
  try {
    // Fund the main issuer account

    // For each user request
    const user = Keypair.random();
    const mainIssuerKeypair = Keypair.random();

    const intermediateIssuer = Keypair.fromSecret(
      "SAWJRMI63OGHJ5EOBQY6IKHEUFQ4NWP4EHRUVO4OY6EI7UCRFLHY5YBL"
    );
    // const intermediateIssuer = Keypair.random();

  
    await fundAccount(mainIssuerKeypair);
    await fundAccount(user);
    // await fundAccount(intermediateIssuer);

    const assetName = "KYCASSET";
    const amount = 25;
    const listing_price = 5;

    // const intermediary_one = Keypair.random();
    // const intermediary_two = Keypair.random();
    // await fundAccount(intermediary_one);
    // await fundAccount(intermediary_two);

    const asset = new Asset(assetName, mainIssuerKeypair.publicKey());

    // //Transferring asset to user and collecting money
    // await createTrust(asset, mainIssuerKeypair, user);
    // await transferAsset(asset, mainIssuerKeypair, user, assetName);

    await list_game(asset, mainIssuerKeypair, intermediateIssuer, assetName);

    // // //payment
    // await transfer_money(amount - listing_price, user, mainIssuerKeypair);
    // await transfer_money(listing_price, user, intermediateIssuer);
  } catch (error) {
    console.error("Error during process execution:", error);
  }
};

runProcess().catch(console.error);

// await createTrust(asset, mainIssuerKeypair, intermediateIssuer);
// await transferAsset(asset, mainIssuerKeypair, intermediateIssuer, assetName);

// //Transferring asset to user and collecting money
// await createTrust(asset, intermediateIssuer, user);
// await transferAsset(asset, intermediateIssuer, user, assetName);

// // //payment
// await transfer_money(amount - listing_price, user, mainIssuerKeypair);
// await transfer_money(listing_price, user, intermediateIssuer);

// app.post('/fund-account', async (req, res) => {
//     try {
//         const { publicKey } = req.body;
//         console.log(`Received request to fund account ${publicKey}`);
//         const fetch = await import('node-fetch').then(mod => mod.default);
//         const response = await fetch(`https://friendbot.diamcircle.io/?addr=${publicKey}`);
//         if (!response.ok) {
//             throw new Error(`Failed to activate account ${publicKey}: ${response.statusText}`);
//         }
//         const result = await response.json();
//         console.log(`Account ${publicKey} activated`, result);
//         res.json({ message: `Account ${publicKey} funded successfully` });
//     } catch (error) {
//         console.error('Error in fund-account:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post('/make-payment', async (req, res) => {
//     try {
//         const { senderSecret, receiverPublicKey, amount } = req.body;
//         console.log(`Received request to make payment from ${senderSecret} to ${receiverPublicKey} with amount ${amount}`);

//         const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
//         const senderKeypair = Keypair.fromSecret(senderSecret);
//         const senderPublicKey = senderKeypair.publicKey();

//         const account = await server.loadAccount(senderPublicKey);
//         const transaction = new TransactionBuilder(account, {
//             fee: await server.fetchBaseFee(),
//             networkPassphrase: Networks.TESTNET,
//         })
//             .addOperation(Operation.payment({
//                 destination: receiverPublicKey,
//                 asset: Asset.native(),
//                 amount: amount,
//             }))

//             .setTimeout(30)
//             .build();

//         transaction.sign(senderKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Payment made from ${senderPublicKey} to ${receiverPublicKey} with amount ${amount}`, result);
//         res.json({ message: `Payment of ${amount} DIAM made to ${receiverPublicKey} successfully` });
//     } catch (error) {
//         console.error('Error in make-payment:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post('/manage-data', async (req, res) => {
//     try {
//         const { senderSecret, key, value } = req.body;
//         console.log(`Received request to manage data for key ${key} with value ${value}`);

//         const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
//         const senderKeypair = Keypair.fromSecret(senderSecret);
//         const senderPublicKey = senderKeypair.publicKey();

//         const account = await server.loadAccount(senderPublicKey);
//         const transaction = new TransactionBuilder(account, {
//             fee: await server.fetchBaseFee(),
//             networkPassphrase: Networks.TESTNET,
//         })
//             .addOperation(Operation.manageData({
//                 name: key,
//                 value: value || null,
//             }))
//             .setTimeout(30)
//             .build();

//         transaction.sign(senderKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Data managed for key ${key} with value ${value}`, result);
//         res.json({ message: `Data for key ${key} managed successfully` });
//     } catch (error) {
//         console.error('Error in manage-data:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post('/set-options', async (req, res) => {
//     try {
//         const { senderSecret, inflationDest, homeDomain, lowThreshold, medThreshold, highThreshold } = req.body;
//         console.log(`Received request to set options with inflationDest: ${inflationDest}, homeDomain: ${homeDomain}, thresholds: ${lowThreshold}, ${medThreshold}, ${highThreshold}`);

//         const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
//         const senderKeypair = Keypair.fromSecret(senderSecret);
//         const senderPublicKey = senderKeypair.publicKey();

//         const account = await server.loadAccount(senderPublicKey);
//         const transaction = new TransactionBuilder(account, {
//             fee: await server.fetchBaseFee(),
//             networkPassphrase: Networks.TESTNET,
//         })
//             .addOperation(Operation.setOptions({
//                 inflationDest: inflationDest || undefined,
//                 homeDomain: homeDomain || undefined,
//                 lowThreshold: lowThreshold ? parseInt(lowThreshold) : undefined,
//                 medThreshold: medThreshold ? parseInt(medThreshold) : undefined,
//                 highThreshold: highThreshold ? parseInt(highThreshold) : undefined,
//             }))
//             .setTimeout(30)
//             .build();

//         transaction.sign(senderKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log('Options set successfully:', result);
//         res.json({ message: 'Options set successfully' });
//     } catch (error) {
//         console.error('Error in set-options:', error);
//         res.status(500).json({ error: error.message });
//     }
// });
// console.log(intermediary_one.publicKey());
// console.log(intermediary_two.publicKey());
// await fundAccount(intermediary_one);

// await userCreateIaAccount(
//   mainIssuerKeypair,
//   intermediary_one.publicKey(),
//   assetName
// );
// await mintKycAsset(assetName, mainIssuerKeypair, intermediary_one);

// await createTrust(asset, mainIssuerKeypair, intermediary_one);
// await transferAsset(asset, mainIssuerKeypair, intermediary_one, assetName);

// //Transferring asset to user and collecting money
// await createTrust(asset, intermediary_one, intermediateIssuer);
// await transferAsset(asset, intermediary_one, intermediateIssuer, assetName);

// await createTrust(asset, intermediateIssuer, intermediary_two);
// await transferAsset(asset, intermediateIssuer, intermediary_two, assetName);

// //Transferring asset to user and collecting money
// await createTrust(asset, intermediary_two, user);
// await transferAsset(asset, intermediary_two, user, assetName);

// //payment
// await transfer_money(amount - listing_price, user, mainIssuerKeypair);
// await transfer_money(listing_price, user, intermediateIssuer);

// // //payment
// await transfer_money(amount - listing_price, user, mainIssuerKeypair);
// await transfer_money(listing_price, user, intermediateIssuer);
// await transfer_money(intermediateIssuer, mainIssuerKeypair);
// // await transfercuttinglist(intermediateIssuer, mainIssuerKeypair);

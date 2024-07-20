import * as StellarSdk from "@stellar/stellar-sdk";
import CryptoJS from "crypto-js";
import { Horizon } from "stellar-sdk";

export const createWallet = () => {
  const keypair = StellarSdk.Keypair.random();

  return {
    public_key: keypair.publicKey(),
    secret_key: keypair.secret(),
  };
};

export const encrypt = (data, keyword) => {
  const encryptedLoginData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    keyword
  );
  return encryptedLoginData.toString();
};

export const decrypt = (item, keyword) => {
  try {
    const decryptedData = CryptoJS.AES.decrypt(item, keyword).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedDataJson = JSON.parse(decryptedData);
    return decryptedDataJson;
  } catch (error) {
    return null;
  }
};

export const getBalance = async (pubKey) => {
  let balance;
  try {
    const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
    const account = await server.accounts().accountId(pubKey).call();
    balance = parseFloat(account.balances[account.balances.length - 1].balance);

    return balance;
  } catch (e) {
    balance = 0;
    return balance;
  }
};

const DiamanteHDWallet = require("diamante-hd-wallet");

const generateWallet = (req, res) => {
  const mnemonic = DiamanteHDWallet.generateMnemonic({ entropyBits: 128 });
  const wallet = DiamanteHDWallet.fromMnemonic(mnemonic);

  const publicKey = wallet.getPublicKey(0);
  const secretKey = wallet.getSecret(0);

  res.json({
    mnemonic,
    publicKey,
    secretKey,
  });
};

module.exports = {
  generateWallet,
};

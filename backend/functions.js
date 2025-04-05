const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

const network = bitcoin.networks.testnet;

const WIF = 'cV...';

const keyPair = bitcoin.ECPair.fromWIF(WIF, network);
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

console.log('Sender address (from):', address);

async function getUTXOs(addr) {
  const url = `https://blockstream.info/testnet/api/address/${addr}/utxo`;
  const response = await axios.get(url);
  return response.data;
}

async function createTransaction(toAddress, sendAmount = 5000, fee = 300) {
  const utxos = await getUTXOs(address);
  if (utxos.length === 0) {
    console.log('No UTXOs available.');
    return null;
  }

  const psbt = new bitcoin.Psbt({ network });

  const utxo = utxos[0];

  if (utxo.value < sendAmount + fee) {
    console.log('Insufficient balance.');
    return null;
  }

  psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout,
    nonWitnessUtxo: Buffer.from(
      (await axios.get(`https://blockstream.info/testnet/api/tx/${utxo.txid}/hex`)).data,
      'hex'
    ),
  });

  psbt.addOutput({
    address: toAddress,
    value: sendAmount,
  });

  psbt.addOutput({
    address: address,
    value: utxo.value - sendAmount - fee,
  });

  psbt.signInput(0, keyPair);
  psbt.finalizeAllInputs();

  const rawTx = psbt.extractTransaction().toHex();
  console.log('Raw transaction hex:\n', rawTx);

  console.log('\nYou can now broadcast this transaction at:\nhttps://blockstream.info/testnet/tx/push');

  return rawTx;
}

module.exports = {
  createTransaction,
};

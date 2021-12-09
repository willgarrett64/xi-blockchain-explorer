const express = require('express');
const {fetchXi, getWalletTxs} = require('../utils/fetchXiData');

const walletsRouter = express.Router();

// get 1st page of wallets (10 most recent)
walletsRouter.get('/', async (req, res) => {

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  const data = await fetchXi('/wallets');
  if (data.error) {
    res.status(400).send(data.error)
  } 
  res.send(data.slice(0, 10));
})


// return list of 10 wallets for subsequent pages (after the intial 10 most recent)
walletsRouter.get('/page/:num', async (req, res) => {
  const pageNo = req.params.num;
  const startingWallet = pageNo * 10;

  //FIX: need to figure out how to count total number of wallets to work out total number of pages!

  const data = await fetchXi('/wallets');
  if (data.error) {
    res.status(400).send(data.error)
  } 
  res.send(data.slice(startingWallet, startingWallet + 10));
})


// get single transaction by hash 
walletsRouter.get('/:address', async (req, res) => {
  const walletAddress = req.params.address;
  let latestBlock = req.latestBlock;

  const wallet = await fetchXi('/wallets/' + walletAddress);
  const transactions = await getWalletTxs(walletAddress, latestBlock);

  wallet.transactions = transactions;
  
  res.send(wallet)
})

walletsRouter.get('/:address/page/:num', async (req, res) => {
  const walletAddress = req.params.address;
  let latestBlock = req.latestBlock;

  const wallet = await fetchXi('/wallets/' + walletAddress);
  const transactions = await getWalletTxs(walletAddress, latestBlock, req.params.num);

  wallet.transactions = transactions;
  
  res.send(wallet)
})



module.exports = walletsRouter;

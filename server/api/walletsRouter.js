const express = require('express');
const {fetchXi, getWalletTxs, getTxBlock} = require('../utils/fetchXiData');
const {cleanData, cleanListOfData} = require('../utils/cleanData')

const walletsRouter = express.Router();

// get 1st page of wallets (10 most recent)
walletsRouter.get('/', async (req, res) => {
  //FIX: need to figure out how to count total number of transactions to work out total number of pages!
  const walletsRaw = await fetchXi('/wallets');
  if (walletsRaw.error) {
    res.status(400).send(walletsRaw.error)
  } 
  
  // clean data so readable by by Table componenet in Vue app, and limit to 10
  const walletsClean = cleanListOfData(walletsRaw.slice(0, 10));
  res.send(walletsClean);
})



// return list of 10 wallets for subsequent pages (after the intial 10 most recent)
walletsRouter.get('/page/:num', async (req, res) => {
  const pageNo = req.params.num;
  const startingWallet = pageNo * 10;
  
  //FIX: need to figure out how to count total number of wallets to work out total number of pages!
  const walletsRaw = await fetchXi('/wallets');
  if (walletsRaw.error) {
    res.status(400).send(walletsRaw.error)
  } 
  
  // clean data so readable by by Table componenet in Vue app, and limit to 10
  const walletsClean = cleanListOfData(walletsRaw.slice(startingWallet, startingWallet + 10));
  res.send(walletsClean);
})


// get single transaction by hash and associated transactions (first 10)
walletsRouter.get('/:address', async (req, res) => {
  const walletAddress = req.params.address;
  let latestBlock = req.latestBlock;
  
  // get wallet and associated transactions
  const walletRaw = await fetchXi('/wallets/' + walletAddress);
  const transactionsRaw = await getWalletTxs(walletAddress, latestBlock);
  
  // clean data so readable by by Table componenet in Vue app
  const walletClean = cleanData(walletRaw);
  const transactionsClean = cleanListOfData(transactionsRaw)
  walletClean.transactions = transactionsClean;
  res.send(walletClean)
})


// get subsequent pages of transactions for single transaction (10 per page)
walletsRouter.get('/:address/page/:num', async (req, res) => {
  const walletAddress = req.params.address;
  let latestBlock = req.latestBlock;
  
  // get wallet and associated transactions
  const walletRaw = await fetchXi('/wallets/' + walletAddress);
  const transactionsRaw = await getWalletTxs(walletAddress, latestBlock, req.params.num);
  
  // clean data so readable by by Table componenet in Vue app
  const walletClean = cleanData(walletRaw);
  const transactionsClean = cleanListOfData(transactionsRaw)
  walletClean.transactions = transactionsClean;
  res.send(walletClean);
})



module.exports = walletsRouter;

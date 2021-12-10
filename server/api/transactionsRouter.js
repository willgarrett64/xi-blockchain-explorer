const express = require('express');
const {fetchXi, getTxBlock, getAllTxBlock} = require('../utils/fetchXiData');
const {cleanData, cleanListOfData} = require('../utils/cleanData')

const transactionsRouter = express.Router();

// get 1st page of transactions (10 most recent blocks)
transactionsRouter.get('/', async (req, res) => {

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  let transactionsRaw = await fetchXi('/transactions');
  if (transactionsRaw.error) {
    res.status(400).send(transactionsRaw.error)
  } 

  // add the block associated with each transaction
  transactionsRaw = await getAllTxBlock(transactionsRaw, req.latestBlock);

  // clean data so readable by by Table componenet in Vue app
  const transactionsClean = cleanListOfData(transactionsRaw);

  res.send(transactionsClean);
})


// return list of 10 transactions for subsequent pages (after the intial 10 most recent)
transactionsRouter.get('/page/:num', async (req, res) => {
  const pageNo = req.params.num;
  let latestBlock = req.latestBlock;
  
  const skipTxs = (pageNo - 1) * 10;

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  // since '/transactions' only returns latest 10, the only way to get previous transactions is by going back through blocks one by one using '/blocks/:height', extracting the transactions from there
  let transactions = [];
  let txCount = 1;
  while (transactions.length < 10 && latestBlock > 10) {
    const block = await fetchXi('/blocks/' + latestBlock);
    block.transactions.forEach(tx => {
      if (txCount > skipTxs) {
        transactions.push(tx);
      } 
      txCount++;
    })
    latestBlock--;
  }

  // add the block associated with each transaction
  transactions = await getAllTxBlock(transactions, latestBlock);
  
  // clean data so readable by by Table componenet in Vue app
  const transactionsClean = cleanListOfData(transactionsWithBlock);

  res.send(transactionsClean)
})


// get single transaction by hash 
transactionsRouter.get('/:hash', async (req, res) => {
  const txHash = req.params.hash;
  let latestBlock = req.latestBlock;
  
  // Since the xi api only allows you to request a single transaction if you also know the block height ('/blocks/:height/transactions/:hash'), there is no simple way to get a transaction from the hash alone. There is also no list of all transactions to search through. 
  //Solution: iterate through each block and search through the list of the block's transactions until a matching hash is found.
  // The search begins from the more recent block for performance purposes - the assumption being that it's more likely the user is searching something recent 
  let transactionRaw = null;
  while (!transaction && latestBlock > 0) {
    const block = await fetchXi('/blocks/' + latestBlock);
    transactionRaw = block.transactions.find(tx => txHash === tx.hash)
    latestBlock--;
  }

  if (!transaction) {
    res.status(400).send('transaction not found')
  }

  transactionRaw.block = latestBlock;

  // clean data so readable by by Table componenet in Vue app
  const transactionClean = cleanData(transactionRaw);

  res.send(transactionClean)
})



module.exports = transactionsRouter;

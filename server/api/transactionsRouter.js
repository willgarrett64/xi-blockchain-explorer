const express = require('express');
const {fetchXi} = require('../utils/fetchXiData');
const {getLatestBlock} = require('../utils/customMiddleware');

const transactionsRouter = express.Router();

// get 1st page of transactions (10 most recent blocks)
transactionsRouter.get('/', async (req, res) => {

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  const data = await fetchXi('/transactions');
  if (data.error) {
    res.status(400).send(data.error)
  } 
  res.send(data)
})


// return list of 10 transactions for subsequent pages (after the intial 10 most recent)
transactionsRouter.get('/page/:num', getLatestBlock, async (req, res) => {
  const pageNo = req.params.num;
  let latestBlock = req.latestBlock;
  
  const skipTxs = (pageNo - 1) * 10;

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  // since '/transactions' only returns latest 10, the only way to get previous transactions is by going back through blocks one by one using '/blocks/:height', extracting the transactions from there
  let transactions = [];
  let txNum = 1;
  while (transactions.length < 10) {
    const block = await fetchXi('/blocks/' + latestBlock);
    block.transactions.forEach(tx => {
      if (txNum > skipTxs) {
        transactions.push(tx);
      } 
    })
    txNum++;
    latestBlock--;
  }
  
  res.status(200).send(transactions)
})


// get single transaction by hash 
transactionsRouter.get('/:hash', getLatestBlock, async (req, res) => {
  const txHash = req.params.hash;
  let latestBlock = req.latestBlock;
  
  // Since the xi api only allows you to request a single transaction if you also know the block height ('/blocks/:height/transactions/:hash'), there is no simple way to get a transaction from the hash alone. There is also no list of all transactions to search through. My solution is to iterate through each block and search through the list of the blocks' transactions until a matching hash is found.
  // The search begins from the more recent block for performance purposes - the assumption being that it's more likely the user is searching something recent 
  let transaction = null;
  while (!transaction && latestBlock > 0) {
    const block = await fetchXi('/blocks/' + latestBlock);
    transaction = block.transactions.filter(tx => txHash === tx.hash)[0]
    latestBlock--;
  }

  if (!transaction) {
    res.status(400).send('transaction not found')
  }

  res.send(transaction)
})



module.exports = transactionsRouter;

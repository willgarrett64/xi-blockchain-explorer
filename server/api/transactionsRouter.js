const express = require('express');
const {fetchXi, getTxBlock} = require('../utils/fetchXiData');

const transactionsRouter = express.Router();

// get 1st page of transactions (10 most recent blocks)
transactionsRouter.get('/', async (req, res) => {

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  const transactions = await fetchXi('/transactions');
  if (transactions.error) {
    res.status(400).send(transactions.error)
  } 

  // add the block associated with each transaction
  const txs = await Promise.all(transactions.map(async tx => {
    const height = await getTxBlock(tx.hash, req.latestBlock);
    return {...tx, block: height}
  }))

  res.send(txs);
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
  const txs = await Promise.all(transactions.map(async tx => {
    const height = await getTxBlock(tx.hash, req.latestBlock);
    return {...tx, block: height}
  }))
  
  res.status(200).send(txs)
})


// get single transaction by hash 
transactionsRouter.get('/:hash', async (req, res) => {
  const txHash = req.params.hash;
  let latestBlock = req.latestBlock;
  
  // Since the xi api only allows you to request a single transaction if you also know the block height ('/blocks/:height/transactions/:hash'), there is no simple way to get a transaction from the hash alone. There is also no list of all transactions to search through. 
  //Solution: iterate through each block and search through the list of the block's transactions until a matching hash is found.
  // The search begins from the more recent block for performance purposes - the assumption being that it's more likely the user is searching something recent 
  let transaction = null;
  while (!transaction && latestBlock > 0) {
    const block = await fetchXi('/blocks/' + latestBlock);
    transaction = block.transactions.find(tx => txHash === tx.hash)
    latestBlock--;
  }

  if (!transaction) {
    res.status(400).send('transaction not found')
  }

  transaction.block = latestBlock;

  res.send(transaction)
})



module.exports = transactionsRouter;

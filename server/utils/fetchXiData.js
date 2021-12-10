const fetch = require('node-fetch');

// fetch data from the xi api
const fetchXi = async (endpoint) => {
  try {
    const apiUrl = 'https://xi.test.network'
    const response = await fetch(apiUrl + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}


// Issue: wallet data from the xi api doesn't come with list of transactions 
// Solution: as there is no list of all transactions to filter through, I iterate through each block and filter through the list of that block's transactions to get matches (ie. where wallet address argument matches either "to" or "for" address).
// This is limited to 10 per page for performance purposes, so there is no need to iterate over every block every time. 
const getWalletTxs = async (address, latestBlock, pageNo = 1) => {
  let searchBlock = latestBlock;
 
  // number of transactions to skip based on page number (10 per page)
  const skipTxs = (pageNo - 1) * 10;

  //FIX: need to figure out how to count total number of transactions to work out total number of pages!

  let transactions = [];
  let txCount = 1;
  while (transactions.length < 10 && searchBlock > 0) {
    const block = await fetchXi('/blocks/' + searchBlock);
    block.transactions.forEach(tx => {
      if (tx.for === address || tx.to === address) {
        if (txCount > skipTxs) {
          transactions.push(tx);
        } 
      }
      txCount++;
    })
    searchBlock--;
  }

  // add the block of each transaction
  transactions = await getAllTxBlock(transactions, latestBlock);

  return transactions;
}


// Issue: transaction data from the xi api doesn't come with associated block height
// Solution: as there is no list of all transactions to filter through, I iterate through each block and filter through the list of that block's transactions to get matches (ie. where wallet address argument matches either "to" or "for" address).
// This is limited to 10 per page for performance purposes, so there is no need to iterate over every block every time. 
const getTxBlock = async (txHash, latestBlock) => {
  let searchBlock = latestBlock
  console.log(searchBlock);
  let txBlock = null;

  while (!txBlock && searchBlock > 0) {
    const block = await fetchXi('/blocks/' + searchBlock);
    if(block.transactions.some(tx => txHash === tx.hash)) {
      txBlock = searchBlock
    }
    searchBlock--;
  }

  if (!txBlock) {
    return null;
  }

  return txBlock;
}

// iterate over list of transactions to add block to each
const getAllTxBlock = async (txs, latestBlock) => {
  const txsWithBlock = await Promise.all(txs.map(async tx => {
    const blockHeight = await getTxBlock(tx.hash, latestBlock);
    return {...tx, block: blockHeight}
  }));
  return txsWithBlock;
}

module.exports = {fetchXi, getWalletTxs, getTxBlock, getAllTxBlock}

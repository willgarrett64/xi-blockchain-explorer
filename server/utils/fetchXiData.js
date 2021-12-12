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
  let skippedTxs = 0;
  while (transactions.length < 10 && searchBlock > 0) {
    const block = await fetchXi('/blocks/' + searchBlock);
    block.transactions.forEach(tx => {
      if (tx.for === address || tx.to === address) {
        if (skippedTxs > skipTxs) {
          tx.block = searchBlock; // add block height to tx data
          transactions.push(tx);
        } 
        skippedTxs++;
      }
    })
    searchBlock--;
  }
  if (transactions.length === 0) return null; 
  return transactions;
}


/* 
Iterate over list of transactions and return array with block height added to each transaction under 'block' key. 

-Issue: transaction data from the xi api doesn't come with associated block height
-Solution: as there is no list of all transactions to filter through, I iterate through each block and filter through the list of that block's transactions to get a match (ie. where a block tx list contains a tx with the hash being searched for
*/
const getAllTxBlock = async (transactions, latestBlock) => {
  const blocks = []; // list of blocks (each containing list of transactions)
  let searchBlock = latestBlock;
  let txsWithBlock;

  do {
    const block = await fetchXi('/blocks/' + searchBlock);
    blocks.push(block); // each block obtained

    console.log(blocks.length);

    txsWithBlock = transactions.map(transaction => {
      let txBlock = null;
      
      while(!txBlock) {
        txBlock = blocks.find(block => {
          return (block.transactions.some(tx => tx.hash === transaction.hash))
        })
      }

      return {...transaction, block: txBlock.height}
    })

    searchBlock--;

  } while (txsWithBlock.length !== transactions.length && searchBlock > 0);

  if (txsWithBlock.length !== transactions.length) return null

  return txsWithBlock;
}

module.exports = {fetchXi, getWalletTxs, getAllTxBlock}

const express = require('express');
const {fetchXi} = require('../utils/fetchXiData');
const {cleanData, cleanListOfData} = require('../utils/cleanData');

const blocksRouter = express.Router();

// get 1st page of blocks (10 most recent)
blocksRouter.get('/', async (req, res) => {
  const blocksRaw = await fetchXi('/blocks');
  if (blocksRaw.error) {
    res.status(400).send(blocksRaw.error)
  } 

  // clean data so readable by by Table componenet in Vue app
  const blocksClean = cleanListOfData(blocksRaw);

  res.send(blocksClean)
})


// return list of 10 blocks for subsequent pages (after the intial 10 most recent)
blocksRouter.get('/page/:num', async (req, res) => {
  const pageNo = req.params.num;
  if (pageNo > req.numberOfBlockPages) {
    res.status(400).send("page not found")
  }

  const latestBlock = req.latestBlock;

  // this refers to the first block height for the selected page - e.g. if the most recent block is 35, page 2 would start from block 25, and page 3 from block 15, etc
  const startingBlock = latestBlock - (10 * (pageNo - 1));

  // since '/blocks' only returns latest 10, the only way to get previous blocks is by requesting them one by one using '/blocks/:height'
  const promises = [];
  for (let i = startingBlock; i > startingBlock - 10 && i > 0; i--) {
    promises.push(fetchXi('/blocks/' + i));
  }
  const blocksRaw = await Promise.all(promises)
  
  // clean data so readable by by Table componenet in Vue app
  const blocksClean = cleanListOfData(blocksRaw);

  res.send(blocksClean)
})


// get single block by height
blocksRouter.get('/:height', async (req, res) => {
  const height = req.params.height;
  
  const blockRaw = await fetchXi('/blocks/' + height);
  if (blockRaw.error) {
    res.status(400).send(blockRaw)
  } 

  // add block height to each transaction
  const transactionsRaw = blockRaw.transactions.map(tx => {
    return {...tx, block: blockRaw.height};
  })

  // clean data so readable by by Table componenet in Vue app
  const blockClean = cleanData(blockRaw);
  const transactionsClean = cleanListOfData(transactionsRaw);
  blockClean.transactions = transactionsClean;

  res.send(blockClean)
})


module.exports = blocksRouter;

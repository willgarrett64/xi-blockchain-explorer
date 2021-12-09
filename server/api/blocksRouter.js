const express = require('express');
const {fetchXi} = require('../utils/fetchXiData');
const {getLatestBlock} = require('../utils/customMiddleware');

const blocksRouter = express.Router();

// get 1st page of blocks (10 most recent blocks)
blocksRouter.get('/', getLatestBlock, async (req, res) => {
  const data = await fetchXi('/blocks');
  if (data.error) {
    res.status(400).send(data.error)
  } 
  res.send(data)
})


// return list of 10 blocks for subsequent pages (after the intial 10 most recent)
blocksRouter.get('/page/:num', getLatestBlock, async (req, res) => {
  const pageNo = req.params.num;
  if (pageNo > req.numberOfPages) {
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
  const blockList = await Promise.all(promises)
  
  res.status(200).send(blockList)
})


// get single block by height
blocksRouter.get('/:height', async (req, res) => {
  const height = req.params.height;
  
  const data = await fetchXi('/blocks/' + height);
  if (data.error) {
    res.status(400).send(data)
  } 
  res.send(data)
})



module.exports = blocksRouter;

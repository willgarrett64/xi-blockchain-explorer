const express = require('express');
const cors = require('cors');
const {getLatestBlock} = require('./utils/customMiddleware')
const app = express();  

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const path = __dirname + '/views/'

//Mount the api router at the '/api' path
const apiRouter = require('./api/apiRouter');
app.use('/api', getLatestBlock, apiRouter);
app.use(express.static(path))

app.get('/', function (req, res) {
  res.sendFile(path + "index.html");
});



// #region Testing Node Cache
const {fetchXi} = require('./utils/fetchXiData');

// set up the cache
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


const getInitData = async () => {
  const latestBlock = await fetchXi('/blocks/latest');

  let blocks = [];
  let wallets = [];

  // iterate through all blocks and acquire data (currently set to go from latest to 10000th rather than 1st to speed up testing)
  // This will be an expensive task but it is only ran once on server start
  const blockPromises = [];
  for (let height = latestBlock.height; height > 10000; height--) {
    blockPromises.push(fetchXi('/blocks/' + height));
  }

  blocks = await Promise.all(blockPromises);
  wallets = await fetchXi('/wallets');


  // set cache data
  myCache.mset([
    {key: "blocks", val: blocks},
    {key: "wallets", val: wallets},
  ])
   
  console.log('Initial Data Acquired');
}

// begin the initial fetch for all data.
getInitData();


const updateData = async () => {
  // check what the latest block height is
  const latestBlock = await fetchXi('/blocks/latest');
  const latestHeight = parseInt(latestBlock.height);
  console.log('Newest Block: ' + latestHeight);

  // check what most recently acquired block is in cache
  const currentBlocks = myCache.get("blocks");
  let updatedBlocks, lastAcquired;
  // currently data tries to update before the initial data is acquired - this is to stop crashing
  if (currentBlocks.length > 0) {
    updatedBlocks = [...myCache.get("blocks")];
    lastAcquired = parseInt(currentBlocks[0].height)
  }
  console.log('Last Acquired: ' + lastAcquired);

  // acquire new data only if there is a new block beyond what exists in cache
  if (latestHeight > lastAcquired) {
    // with the current interval (10s) it's unlikely there will be multiple new blocks, but this loops is to catch the situation where the cache is more than one block out of date
    let newBlockPromises = [];
    for (let height = lastAcquired + 1; height <= latestHeight; height++) {
      console.log('Acquiring new: ' + height);
      newBlockPromises.push(fetchXi('/blocks/' + height));
    }

    const newBlocks = await Promise.all(newBlockPromises);
    newBlocks.forEach(block => {
      // add to start of arary since index 0 is always most recent block
      updatedBlocks.unshift(block);
    })

    // update all the wallets as well (since balances might update)
    const updatedWallets = await fetchXi('/wallets')

    // reset the cache
    myCache.mset([
      {key: "blocks", val: updatedBlocks},
      {key: "wallets", val: updatedWallets},
    ])

    console.log('Data updated');
  } else {
    console.log('No update needed');
  }
} 

// check for updates and fetch new data every 10s
const polling = setInterval(updateData, 10000);

// test route to check if the blocks data has updated
app.get('/test', async (req, res) => {
  res.send(myCache.get("blocks"));
});



// #endregion Testing Node Cache


app.listen(PORT, () => console.log((`XI Blockchain Explorer server is listening at port ${PORT}`)));
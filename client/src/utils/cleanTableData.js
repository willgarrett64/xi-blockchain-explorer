  // const unixToMinsAgo = (unix) => {

// }

// add "block" property to transactions objects containing the transactions block height
// IMPORTANT: the memo property is always in same format and contains the block height, however this isn't an ideal solution
const addBlockToTransaction = (transaction) => {
  return transaction.memo.split(' ')[1].substring(1);
}


// add "to" property for data where a link is required
const addLink = (data, key, type) => {
  switch (key) {
    case 'to': 
    case 'from': 
    case 'miner': 
    case 'address': 
      return `/wallets/${data[key]}`;
    case 'height': 
    case 'block':
      return `/blocks/${data[key]}`;
    case 'hash':
      if (type === 'block') {
        // since there is no block/:hash endpoint in the URL, I have reused height for the route
        return `/blocks/${data.height}`;
      } else if (type === 'transaction') {
        return `/blocks/${data.block}/transactions/${data[key]}`;
      }        
      break;
    case 'parentHash': 
      return `/blocks/${data.height - 1}`;
    default:
      break;
  }
}


// parse raw data from api into a format that is readable by the Table component. This requires converting properties to objects that contain a "data" property (with the value) and a "to" property (with the link route if required)
/* E.g. 
  {a: 1, b: 2, c: 3} 
  =>
  {
    a: {data: 1, to:"/route..."}, 
    b: {data: 2, to:"/route..."}, 
    c: {data: 3, to: null}
  }
 */
const convertToTableData = (data, type) => {
  let tableData = {}

  // extract the block number for each transaction and add as property
  if (type === 'transaction') {
    data.block = addBlockToTransaction(data);
  }  

  // parse original data and add a "to" property
  for (const key in data) {
    tableData[key] = {
      data: data[key],
      to: addLink(data, key, type)
    }
  }

  // for blocks, add total number of transations as property
  if (type === 'block') {
    tableData.numTransactions = {data: data.transactions.length};
  }  

  // both blocks and transactions have a unique "hash" which can be used as a key, however wallets have a unique "address"
  tableData.key = data.hash ? data.hash : data.address

  return tableData;
}


module.exports = {
  convertToTableData,
}
// const unixToMinsAgo = (unix) => {

// }

// find and add "block" property to transactions object
const addBlockToTransaction = (transaction, allBlocks) => {
  let block = allBlocks.find(block => block.transactions.some(el => el.hash === transaction.hash));
  return block.height;
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


// 
const convertToTableData = (data, type) => {
  let tableData = {}

  // reformat data to add a "to" property
  // this is so that the Table component knows where to add links
  for (const key in data) {
    tableData[key] = {
      data: data[key],
      to: addLink(data, key, type)
    }
  }

  if (type === 'block') {
    // add total number of transations
    tableData.numTransactions = {data: data.transactions.length};
  }  

  return tableData;
}


module.exports = {
  convertToTableData,
  addBlockToTransaction
}
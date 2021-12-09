const express = require('express');
const cors = require('cors');

const app = express();  

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Mount the api router at the '/api' path
const apiRouter = require('./api/apiRouter');
app.use('/api', apiRouter);



//TEST
// app.get('/blocks/latest', getLatestBlock, async (req, res) => {
//   const data = await fetchXi('/blocks/latest');
  
//   if (data.error) {
//     res.status(400).send(data.error);
//   } 

//   res.status(200).send(data);
// })



app.listen(PORT, () => console.log((`Countdown app server is listening at port ${PORT}`)));
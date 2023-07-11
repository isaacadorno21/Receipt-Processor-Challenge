const express = require('express')
const uuid = require('uuid');
const app = express()
const port = 3000
const receipts = {}
const calculatePoints = require('./helpers');
app.use(express.json())

// Endpoint: Process Receipts
app.post('/receipts/process', (req, res) => {
   
    // Setting ID and parsing our receipt
    const id = uuid.v4();
    const receipt = req.body;

    // Filling in our local database, receipts, with Map containing the request body and the calculated points
    const receipt_information = {};
    receipt_information["original_data"] = receipt;
    receipt_information["points"] = calculatePoints(receipt)
    receipts[id] = receipt_information;
    
    // Returning our JSON respone, which contains an ID for the receipt
    res.json({id: id});
})

// Endpoint: Get Points
app.get('/receipts/:id/points', (req, res) => {
    try {
        // Get our stored receipt from our database
        const receiptId = req.params.id;
        const receipt = receipts[receiptId];
        res.json({ points: receipt.points });
    } catch(e) {
        // Receipt was not found in database
        res.status(404).send({ error: 'Receipt not found' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// https://www.npmjs.com/package/uuid
// https://expressjs.com
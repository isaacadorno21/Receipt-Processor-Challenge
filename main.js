const express = require('express');
const uuid = require('uuid');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;
const calculatePoints = require('./helpers');
app.use(express.json());

const receipts = {};
const receiptValidator = [
    check('retailer').isString(),
    check('purchaseDate').isISO8601({ strict: true }),
    check('purchaseTime').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    check('items').isArray({ min: 1 }),
    check('items.*.shortDescription').isString(),
    check('items.*.price').isFloat({ min: 0 }),
    check('total').isFloat({ min: 0 }),
];

// Endpoint: Process Receipts
app.post('/receipts/process', receiptValidator, (req, res) => {
    // Check for errors in our request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Setting ID and parsing our receipt
    const id = uuid.v4();
    const receipt = req.body;

    // Checking for duplicates with hashing - assumes receipts are always structured the same
    const receiptString = JSON.stringify(receipt);
    const hash = crypto.createHash('sha256').update(receiptString).digest('hex');
    if (receipts[hash]) {
        res.status(400).json({error: 'Duplicate receipt submitted'});
        return;
    }

    // Filling in our local database, receipts, with Map containing the request body and the calculated points
    const receipt_information = {};
    receipt_information["original_data"] = receipt;
    receipt_information["points"] = calculatePoints(receipt)
    receipt_information["id"] = id
    receipts[hash] = receipt_information;
    console.log(receipts)
    
    // Returning our JSON response, which contains an ID for the receipt
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
  console.log(`Receipt Processor Challenge is live on port ${port}`)
})

// https://www.npmjs.com/package/uuid
// https://expressjs.com
// https://express-validator.github.io/docs/
// https://nodejs.org/api/crypto.html
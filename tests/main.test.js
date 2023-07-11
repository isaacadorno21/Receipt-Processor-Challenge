const request = require('supertest');
const app = require('../main');

let targetReceiptId;
let cornerMarketReceiptId;

describe('Test the Target receipt process path', () => {
    test('200 Status Code, ID is defined', async () => {
        const response = await request(app).post('/receipts/process').send({
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
                {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                },
                {
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                },
                {
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                },
                {
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                },
                {
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                }
            ],
            "total": "35.35"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        targetReceiptId = response.body.id;
    });
});

describe('Test the M&M Corner Market receipt process path', () => {
    test('200 Status Code, ID is defined', async () => {
        const response = await request(app).post('/receipts/process').send({
            "retailer": "M&M Corner Market",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:33",
            "items": [
              {
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              }
            ],
            "total": "9.00"
          });
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        cornerMarketReceiptId = response.body.id;
    });
});

/**
 * Total Points: 28
 * Breakdown:
 *    6 points - retailer name has 6 characters
 *   10 points - 4 items (2 pairs @ 5 points each)
 *    3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
 *               item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
 *    3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
 *               item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
 *    6 points - purchase day is odd
 * + ---------
 * = 28 points
 */
describe('Test the Target receipt points path', () => {
    test('200 Status Code, Returns 28 points', async () => {
        const response = await request(app).get(`/receipts/${targetReceiptId}/points`);
        expect(response.statusCode).toBe(200);
        expect(response.body.points).toBe(28);
    });
});

/**
 * Total Points: 109
 * Breakdown:
 *  50 points - total is a round dollar amount
 *  25 points - total is a multiple of 0.25
 *  14 points - retailer name (M&M Corner Market) has 14 alphanumeric characters
 *              note: '&' is not alphanumeric
 *  10 points - 2:33pm is between 2:00pm and 4:00pm
 *  10 points - 4 items (2 pairs @ 5 points each)
 * + ---------
 * = 109 points
 */
describe('Test the M&M Corner Market receipt points path', () => {
    test('200 Status Code, Returns 109 points', async () => {
        const response = await request(app).get(`/receipts/${cornerMarketReceiptId}/points`);
        expect(response.statusCode).toBe(200);
        expect(response.body.points).toBe(109);
    });
});

describe('Test duplicate receipt submitted', () => {
    test('400 Status Code', async () => {
        const response = await request(app).post('/receipts/process').send({
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
                {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                },
                {
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                },
                {
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                },
                {
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                },
                {
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                }
            ],
            "total": "35.35"
        });
        expect(response.statusCode).toBe(400);
    });
});

describe('Test invalid receipt submitted', () => {
    test('400 Status Code', async () => {
        const response = await request(app).post('/receipts/process').send({
            "retailer": "GameStop",
            "total": "129.48"
        });
        expect(response.statusCode).toBe(400);
    });
});

describe('Test invalid receipt ID', () => {
    test('404 Status Code', async () => {
        const response = await request(app).get(`/receipts/123ABC/points`);
        expect(response.statusCode).toBe(404);
    });
});

// https://www.npmjs.com/package/supertest
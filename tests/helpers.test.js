const {
    calculatePoints,
    calculateRetailerPoints,
    calculateRoundDollarPoints,
    calculateMultiplePoints,
    calculateItemsPoints,
    calculateDescriptionPoints,
    calculateDatePoints,
    calculateTimePoints
} = require('../helpers');

describe('Test calculatePoints function', () => {
    test('It should calculate correct points based on entire receipt', () => {
        expect(calculatePoints({
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
        })).toBe(28);
        expect(calculatePoints({
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
          })).toBe(109);
        expect(calculatePoints({})).toBe(0);
    });
});

describe('Test calculateRetailerPoints function', () => {
    test('It should calculate correct points based on retailer name', () => {
        expect(calculateRetailerPoints('Target')).toBe(6);
        expect(calculateRetailerPoints('M&M Corner Market')).toBe(14);
        expect(calculateRetailerPoints('')).toBe(0);
    });
});

describe('Test calculateRoundDollarPoints function', () => {
    test('It should calculate correct points based on round dollar amount', () => {
        expect(calculateRoundDollarPoints('5.00')).toBe(50);
        expect(calculateRoundDollarPoints('1.23')).toBe(0);
    });
});

describe('Test calculateMultiplePoints function', () => {
    test('It should calculate correct points based on multiplicity', () => {
        expect(calculateMultiplePoints('2.25')).toBe(25);
        expect(calculateMultiplePoints('4.96')).toBe(0);
    });
});

describe('Test calculateItemsPoints function', () => {
    test('It should calculate correct points based on number of items', () => {
        expect(calculateItemsPoints([
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
        ])).toBe(10);
        expect(calculateItemsPoints([
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
          ])).toBe(10);
          expect(calculateItemsPoints([])).toBe(0);
    });
});

describe('Test calculateDescriptionPoints function', () => {
    test('It should calculate correct points based on item descriptions', () => {
        expect(calculateDescriptionPoints([
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
        ])).toBe(6);
        expect(calculateDescriptionPoints([
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
          ])).toBe(0);
          expect(calculateDescriptionPoints([])).toBe(0);
    });
});

describe('Test calculateDatePoints function', () => {
    test('It should calculate correct points based on purchase date', () => {
        expect(calculateDatePoints('2022-01-01')).toBe(6);
        expect(calculateDatePoints('2022-03-20')).toBe(0);
    });
});

describe('Test calculateTimePoints function', () => {
    test('It should calculate correct points based on purchase time', () => {
        expect(calculateTimePoints('14:33')).toBe(10);
        expect(calculateTimePoints('13:01')).toBe(0);
    });
});
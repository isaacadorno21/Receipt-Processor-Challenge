
# Receipt Processor

This is a simple receipt processing server application built with Node.js and Express.

## Overview

This application allows users to process a receipt and calculate reward points based on the receipt data. It also provides an endpoint to fetch the calculated points for a particular receipt.

Points are calculated as following:
- One point for every alphanumeric character in the retailer name.
- 50 points if the total is a round dollar amount with no cents.
- 25 points if the total is a multiple of 0.25.
- 5 points for every two items on the receipt.
- If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
- 6 points if the day in the purchase date is odd.
- 10 points if the time of purchase is after 2:00pm and before 4:00pm.

Here are some examples of reciepts and their corresponding amount of points:

```{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}

Total Points: 28
Breakdown:
     6 points - retailer name has 6 characters
    10 points - 4 items (2 pairs @ 5 points each)
     3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
                item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
     3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
                item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
     6 points - purchase day is odd
  + ---------
  = 28 points
```
```  
{
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
}
Total Points: 109
Breakdown:
    50 points - total is a round dollar amount
    25 points - total is a multiple of 0.25
    14 points - retailer name (M&M Corner Market) has 14 alphanumeric characters
                note: '&' is not alphanumeric
    10 points - 2:33pm is between 2:00pm and 4:00pm
    10 points - 4 items (2 pairs @ 5 points each)
  + ---------
  = 109 points
```

## Prerequisites

To run this project locally, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/download/) version 18.16.1
-   [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
-   [Docker](https://docs.docker.com/get-docker/)

## Local Development

1.  Clone the repository:
        
    `git clone https://github.com/isaacadorno21/Receipt-Processor-Challenge.git`
    
2.  Navigate into the directory:
        
    `cd Receipt-Processor-Challenge`
    
3.  Install the dependencies:
    
    `npm install`
    
4.  Start the server:
    
    `npm start`
    

The server will start running on `http://localhost:3000`.

## Available Endpoints

-   `POST /receipts/process` : Processes a receipt and calculates points based on receipt data.
-   `GET /receipts/:id/points` : Fetches the calculated points for a specific receipt by ID.

## Tests

You can run the tests using Jest:

`npm test`

## Docker

The application can be built and run using Docker. You can install Docker from [their website](https://www.docker.com).

1.  Build the Docker image:
        
    `docker build -t adorno-receipt-processor:latest .`
    
2.  Run the Docker container:
        
    `docker run -p 3000:3000 adorno-receipt-processor:latest`
    

The server will start running on `http://localhost:3000`.

To run tests in Docker, you should build the image with the Dockerfile.test file:

1.  Build the Docker image for testing:
        
    `docker build -f Dockerfile.test  -t adorno-receipt-processor-test:latest .`
    
2.  Run the Docker container for testing:
        
    `docker run adorno-receipt-processor-test:latest`
    
This will automatically run the `npm test` command inside the Docker container.

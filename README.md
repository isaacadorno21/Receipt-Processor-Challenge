
# Receipt Processor

This is a simple receipt processing server application built with Node.js and Express.

## Overview

This application allows users to process a receipt and calculate reward points based on the receipt data. It also provides an endpoint to fetch the calculated points for a particular receipt.

## Prerequisites

To run this project locally, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/download/) version 18.6.1
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

The application can be built and run using Docker.

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
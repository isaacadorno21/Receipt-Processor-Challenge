/**
 * Rules
 * These rules collectively define how many points should be awarded to a receipt.

 * - One point for every alphanumeric character in the retailer name.
 * - 50 points if the total is a round dollar amount with no cents.
 * - 25 points if the total is a multiple of 0.25.
 * - 5 points for every two items on the receipt.
 * - If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
 *   The result is the number of points earned.
 * - 6 points if the day in the purchase date is odd.
 * - 10 points if the time of purchase is after 2:00pm and before 4:00pm.
 * 
 * @param {*} receipt The receipt provided by the user
 * @returns Number of points that will be awarded to the receipt
 */
function calculatePoints(receipt) {
    let points = 0;
    points += calculateRetailerPoints(receipt.retailer);
    points += calculateRoundDollarPoints(receipt.total);
    points += calculateMultiplePoints(receipt.total);
    points += calculateItemsPoints(receipt.items);
    points += calculateDescriptionPoints(receipt.items);
    points += calculateDatePoints(receipt.purchaseDate);
    points += calculateTimePoints(receipt.purchaseTime);
    return points;
}

/**
 * One point for every alphanumeric character in the retailer name
 * @param {*} retailer The retailer name from the receipt
 * @returns Number of alphanumeric characters in the retailer name
 */
function calculateRetailerPoints(retailer) {
    return (retailer.match(/[a-z0-9]/gi) || []).length;
}

/**
 * 50 points if the total is a round dollar amount with no cents
 * @param {*} total The total from the receipt
 * @returns Number of points calculated from the total
 */
function calculateRoundDollarPoints(total) {
    let points = 0;
    if (total.endsWith('.00')) {
        points += 50;
    }
    return points;
}

/**
 * 25 points if the total is a multiple of 0.25
 * @param {*} total The total from the receipt
 * @returns Number of points calculated from the total
 */
function calculateMultiplePoints(total) {
    let points = 0;
    const totalFloat = parseFloat(total);
    if (totalFloat % 0.25 === 0) {
        points += 25;
    }
    return points;
}

/**
 * 5 points for every two items on the receipt
 * @param {*} items The list of items from the receipt
 * @returns Number of items, rounded down and multiplied by 5
 */
function calculateItemsPoints(items) {
    return Math.floor(items.length / 2) * 5;
}

/**
 * If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer
 * The result is the number of points earned
 * @param {*} items The list of items from the receipt
 * @returns Number of points, calculated by each item description
 */
function calculateDescriptionPoints(items) {
    let points = 0;
    items.forEach(item => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            const price = parseFloat(item.price);
            const descriptionPoints = Math.ceil(price * 0.2);
            points += descriptionPoints;
        }
    });
    return points;
}

/**
 * 6 points if the day in the purchase date is odd
 * @param {*} purchaseDate The purchaseDate from the receipt
 * @returns Number of points, calculed from purchase date
 */
function calculateDatePoints(purchaseDate) {
    const date = new Date(purchaseDate);
    return (date.getUTCDate() % 2 !== 0) ? 6 : 0;
}

/**
 * 10 points if the time of purchase is after 2:00pm and before 4:00pm
 * @param {*} purchaseTime The purchaseTime from the receipt
 * @returns Number of points, calculated from purchase time
 */
function calculateTimePoints(purchaseTime) {
    const time = purchaseTime.split(':').map(Number);
    return (time[0] >= 14 && time[0] < 16) ? 10 : 0;
}

module.exports = calculatePoints;
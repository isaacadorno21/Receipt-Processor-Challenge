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
 * @param {*} receipt The receipt provided by the user.
 * @returns Number of points that will be awarded to the receipt.
 */
function calculatePoints(receipt) {
    let points = 0;

    // One point for every alphanumeric character in the retailer name
    points += (receipt.retailer.match(/[a-z0-9]/gi) || []).length;

    // 50 points if the total is a round dollar amount with no cents
    if (receipt.total.endsWith('.00')) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25
    const totalFloat = parseFloat(receipt.total);
    if (totalFloat % 0.25 === 0) {
        points += 25;
    }

    // 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // If the trimmed length of the item description is a multiple of 3, 
    // multiply the price by 0.2 and round up to the nearest integer.
    // The result is the number of points earned
    receipt.items.forEach(item => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            const price = parseFloat(item.price);
            const descriptionPoints = Math.ceil(price * 0.2);
            points += descriptionPoints;
        }
    });

    // 6 points if the day in the purchase date is odd
    const date = new Date(receipt.purchaseDate);
    if (date.getUTCDate() % 2 !== 0) {
        points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const time = receipt.purchaseTime.split(':').map(Number);
    if (time[0] >= 14 && time[0] < 16) {
        points += 10;
    }

    return points;
}

module.exports = calculatePoints;
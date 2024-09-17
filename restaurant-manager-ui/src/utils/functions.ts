

//Used to get random listDishes and drinks for NewOrder
// Function to get random items from an array `arr` of type `T`.
// `arr`: the array to pick items from.
// `num`: the number of items to return.
// Returns an array of randomly selected `num` items from `arr`.
export const getRandomItems = <T>(arr: T[], num: number): T[] => {
    if (arr.length === 0 || num <= 0) {
        return [];
    }
    // If the requested number of items is greater than 4, proceed without checking for duplicates.
    if (num > 4) {
        const result: T[] = [];
        // Loop `num` times to select `num` random items from the array.
        for (let i = 0; i < num; i++) {
            // Get a random index from the array
            const index = Math.floor(Math.random() * arr.length);
            // Push the item at that random index into the result array.
            result.push(arr[index]);
        }
        // Return the array of random items (duplicates may exist).
        return result;
    } else {
        const result: T[] = [];
        const usedIndices = new Set<number>();// Set to track already used indices to avoid duplicates.
        // Continue until we have collected the desired number of unique random items.
        while (result.length < num) {
            // Get a random index from the array.
            const index = Math.floor(Math.random() * arr.length);
            // If the index hasn't been used before, add the corresponding item to the result array.
            if (!usedIndices.has(index)) {
                result.push(arr[index]);
                usedIndices.add(index); // Mark the index as used.
            }
        }
        return result; // Return the array of unique random items
    }
};





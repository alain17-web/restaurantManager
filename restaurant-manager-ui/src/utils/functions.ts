

//get random dishes and drinks for NewOrder
export const getRandomItems = <T>(arr: T[], num: number): T[] => {
    if (arr.length === 0 || num <= 0) {
        return [];
    }

    if (num > 4) {
        const result: T[] = [];
        for (let i = 0; i < num; i++) {
            const index = Math.floor(Math.random() * arr.length);
            result.push(arr[index]);
        }
        return result;
    } else {
        const result: T[] = [];
        const usedIndices = new Set<number>();
        while (result.length < num) {
            const index = Math.floor(Math.random() * arr.length);
            if (!usedIndices.has(index)) {
                result.push(arr[index]);
                usedIndices.add(index);
            }
        }
        return result;
    }
};



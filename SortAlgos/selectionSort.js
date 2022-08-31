// ------------------ SELECTION SORT ------------------

// time complexity ---> WC O(N**2) / AvgC O(N**2) / BC O(N)
// space complexity --> O(1)
// offline algorithm
// useful for small N

const selectionSort = array => {
    for (let i = 0; i < array.length; i++) {
        let lowestValue = array[i], lowestValueI = i;

        for (let j = i + 1; j < array.length; j++) {
            const iterableValue = array[j];

            if(iterableValue < lowestValue) {
                lowestValue = iterableValue
                lowestValueI = j
            }
        }

        array[lowestValueI] = array[i]
        array[i] = lowestValue
    }

    console.log(array)
}

selectionSort([1, 4, 3, 2, 1])
selectionSort([1, 9, 4, 20, 6, 8, 18, 3])
selectionSort([4, 2, 7, 1, 3])
selectionSort([20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])

// ------------------ INSERTION SORT ------------------

// time complexity ---> WC O(N**2) / AvgC O(N**2) / BC O(N)
// space complexity --> O(1)
// stable
// online algorithm
// useful for small N, online algorithm

const insertionSort = array => {
    for (let i = 1; i < array.length; i++){
        const tempVariable = array[i];

        for (let j = i - 1; j >= 0; j--) {
            const prevValue = array[j];

            if(prevValue > tempVariable) {
                array[j + 1] = prevValue
                array[j] = tempVariable
            }else break   
        }
    }

    console.log(array)
    return array
}


insertionSort([5, 1, 4, 3, 2]) // 1, 2, 3, 4, 5
insertionSort([4, 2, 7, 1, 3]) // 1, 2, 3, 4, 7
insertionSort([4, 2, 7, 1, 3, 10, 6, 5, 12, 8]) // 1, 2, 3, 4, 5, 6, 7, 8, 10, 12
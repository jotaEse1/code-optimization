// ------------------ BUBBLE SORT ------------------

// time complexity ---> WC O(N**2) / AvgC O(N**2) / BC O(N)
// space complexity --> O(1)
// stable
// useful for small N, array partially sorted 

const bubbleSort = array => {
    let len = array.length, sorted = false;

    while (!sorted) {
        sorted = true

        for (let i = 1; i < len; i++) {
            const rightValue = array[i], leftValue = array[i - 1];
   
            if(rightValue < leftValue){
                array[i] = leftValue
                array[i - 1] = rightValue
            }

            sorted = false
        }

        len -= 1
    }

    console.log(array)
    return array
}

bubbleSort([5, 4, 3, 2, 1])
bubbleSort([1, 9, 4, 20, 6, 8, 18, 3])
bubbleSort([4, 2, 7, 1, 3])
bubbleSort([20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])

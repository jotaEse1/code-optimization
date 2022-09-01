const partitioningLoop = (array, leftPointer, rightPointer) => {
    let pivot = array[rightPointer], pivotIndex = rightPointer
    rightPointer -= 1

    while (true) {
        while (array[leftPointer] < pivot) leftPointer++

        while (array[rightPointer] > pivot) rightPointer--

        if(leftPointer >= rightPointer) break
        else {
            [ array[leftPointer], array[rightPointer] ] = [ array[rightPointer], array[leftPointer] ]
            //leftPointer -= 1
        }
    }

    [ array[leftPointer], array[pivotIndex] ] = [ pivot, array[leftPointer] ]

    return leftPointer
}

console.log(partitioningLoop([0, 5, 2, 1, 6, 3], 0, 5)) // [0, 1, 2, 3, 6, 5]
console.log(partitioningLoop([1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], 0, 12)) // [1, 14, 5, 20,  4,  2, 1, 20, 3, 32, 87, 54, 98]
console.log(partitioningLoop([3, 5, 2, 1, 6, 0], 0, 5)) // [0, 5, 2, 1, 6, 3]

const partitioningRecursion = (array, lp, rp, pivot) => {
    if(pivot === undefined) pivot = array.at(-1); 
    if(lp === undefined) lp = {v: array[0], index: 0}
    if(rp === undefined) rp = {v: array.at(-2), index: array.length - 2}

    for (let i = lp.index; i < array.length; i++) {
        const el = array[i]

        if(el >= pivot) {
            lp = {v: el, index: i}
            break
        }

        if(i === array.length - 1) lp = {v: el, index: i}
    }

    for (let j = rp.index; j > -1; j--) {
        const el = array[j];
        
        if(el <= pivot) {
            rp = {v: el, index: j}
            break
        }
        if(j === 0) rp = {v: el, index: j}
    }
    
    if(lp.index >= rp.index) {
        array[lp.index] = pivot
        array[array.length - 1] = lp.v

        return array
    }else{
        array[lp.index] = rp.v
        array[rp.index] = lp.v
    }

    return partitioningRecursion(array, {...lp, v: rp.v}, {...rp, v: lp.v}, pivot)

}

console.log(partitioningRecursion([0, 5, 2, 1, 6, 3])) // [0, 1, 2, 3, 6, 5]
console.log(partitioningRecursion([1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32])) // [1, 14, 5, 20,  4,  2, 1, 20, 3, 32, 87, 54, 98]
console.log(partitioningRecursion([3, 5, 2, 1, 6, 0])) // [0, 5, 2, 1, 6, 3]

const quickSort = (array, left = 0, right = array.length - 1) => {
    let pointer = partitioningLoop(array, left, right)

    if(pointer < right) quickSort(array, pointer, right)
    if(pointer - 1 > left) quickSort(array, left, pointer - 1)

    return array
}

console.log(quickSort([3, 9, 0, 5, 2, 1, 6, 7])) // [ 0, 1, 2, 3, 5, 6, 7, 9]
console.log(quickSort([5, 4, 3, 2, 1])) // [1, 2, 3, 4, 5]
console.log(quickSort([1, 14, 5, 20, 4, 2, 54, 87, 98, 3, 32])) // [1,  2,  3,  4,  5, 14, 20, 32, 54, 87, 98]
console.log(quickSort([7, 10, 1, 5, 9, 22, 14, 55, 6])) // [1,  5,  6,  7, 9, 10, 14, 22, 55]



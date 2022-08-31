/* Max number in nested array
    Find the maximum number in an array containing numberos or other arrays of numbers

*/

const findMax = (arr) => {
    let maxNum = 0;

    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];

        if(Array.isArray(el)) el = findMax(el)
        if(el > maxNum) maxNum = el
    }

    return maxNum
}

console.log(findMax([2, 4, 10, [12, 4, [100, 99], 4], [3, 2, 95], 0])) //100
console.log(findMax([2, 4, 10, [12, 4, [99, 5], 4], [3, 2, 99, [1, 101]], 0, [1, [2, [1000]]]])) //1000
console.log(findMax([ [ [ [ [ [ 1 ] ] ] ] ], 5, [3, 4, 8], [1, [2, [3, [4, [5]]]]]])) //8

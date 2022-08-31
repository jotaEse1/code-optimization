/* Replicate
    The function should return an array containing repetitions of the number argument. 
    
    For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.
*/

const replicate = (times, num, arr = []) => {
    if(times < 0) return []
    if(times === 0) return arr

    return replicate(times - 1, num, [...arr, num])
}

console.log(replicate(3, 5)) //[5, 5, 5]
console.log(replicate(1, 5)) //[5]
console.log(replicate(5, 5)) //[5, 5, 5, 5, 5]
console.log(replicate(15, 5)) //[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]



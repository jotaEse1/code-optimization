/* Fibonacci
    Write a JavaScript program to get the first n Fibonacci numbers.

    Note : The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, . . . 
        Each subsequent number is the sum of the previous two.
*/

const fibonacci = num => {
    if(num === 1 || num === 2) return 1

    return fibonacci(num - 1) + fibonacci(num - 2)
}

console.log(fibonacci(1)) //1
console.log(fibonacci(2)) //1
console.log(fibonacci(3)) //2
console.log(fibonacci(4)) //3
console.log(fibonacci(5)) //5
console.log(fibonacci(6)) //5
//console.log(fibonacci(50)) //12586269025 --> too slow

const fibonacciMemo = (num, memo = {}) => {
    if(num in memo) return memo[num]
    if(num === 1 || num === 2) return 1

    memo[num] = fibonacciMemo(num - 1, memo) + fibonacciMemo(num - 2, memo)
    return memo[num]
}

console.log(fibonacciMemo(50)) //12586269025


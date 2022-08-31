/*  Factorial of a Number
    In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive 
        integers less than or equal to n. For example, 
        
        5! = 5 x 4 x 3 x 2 x 1 = 120
*/

const factorial = num => {
    if (num === 0) return 1

    return num * factorial(num - 1)
}

console.log(factorial(1)) //1
console.log(factorial(2)) //2
console.log(factorial(3)) //6
console.log(factorial(4)) //24
console.log(factorial(5)) //120




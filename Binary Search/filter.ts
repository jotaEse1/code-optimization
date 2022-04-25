// -------------------------------------------------- Case 1 ----------------------------------------------------------

/*                                                   Details
Description:
    Code optimization that I made for a personal application called Recost 
    Basically what it does is reduce the time complexity from 
        O(N) --- to --> O(log N)

    Data structure
        Array of objects sorted
    
Problem
    In this application called Recost there's 3 sections where you can search or filter for values dynamically.
    
    Of course this is an easy task that can be done with "filter" method of javaScript. Actually, this method has a 
        time complexity of O(N), what does this mean? 
            if you have 10 records, in it's worst case escenario it will take 10 steps to find the target value
            if you have 100 records, in it's worst case escenario it will take 100 steps to find the target value 
            if you have 1000 records, in it's worst case escenario it will take 1000 steps to find the target value
            and so on...
        
        You would think "well that's not too bad", but remember there's a DYNAMICALLY search
            What i mean by that is that for EVERY word a user types, the filter method will execute

            e.g: Let's say the user wants to search "Oreo cake" in a database of 10.000 records
                First the user will type "O" and the filter mathod will execute 10.000 times, then "r" and 10.000 times
                again and so on

                At the end, the filter method executed 90.0000 times

                ¿How to optimize that?

Solution
    At the begining I implemented the "Binary Search" algorithm in order to reduce drastically the time complexity to
        O(log N), what does this mean?
            if you have 10 records, in it's worst case escenario it will take up to 4 times to find the target value
            if you have 100 records, in it's worst case escenario it will take up to 7 times to find the target value
            if you have 1000 records, in it's worst case escenario it will take up to 10 times to find the target value
            if you have 10000 records, in it's worst case escenario it will take up to 14 times to find the target value

            Basically it's log2 10, log2 100, log2 1000, log2 10000 
    
    But the problem was that I needed to FILTER, and not SEARCH
        What I mean is that actually if the user types "F" then I should get all records starting with "F". Binary
            search only focuses on searching the EXACT value (if the user types "F", binary search will only look for a
            record called "F")
        
        So i had to fix that adding some features to an algorithm wich i call "binary filter", below you can find 
            the process of actually finding the solution and the optimization
*/    

//    -------------------------------------- Binary filter with tail recursion --------------------------------------
    const binaryFilter1 = (array: any[], value: string, called: number = 1): [] | any[] => {
        let from = 0,
            to = array.length,
            middle = Math.floor((from + to) / 2),
            executionNumber = called;

            console.log('called ' + executionNumber)

        if (!array.length) return [];

        const title = array[middle].title.toLocaleLowerCase();

        if (title.startsWith(value)) {
            const recipes:  any[] = [];

            for (let i = 0; i < array.length; i++) {
                const recipe = array[i];
                console.log('bucle for')

                if(recipe.title.toLocaleLowerCase().startsWith(value)) recipes.push(recipe)
            }

            return recipes
        }
        if (title > value) {
            let newArr = array.slice(from, middle);
            return binaryFilter1(newArr, value, executionNumber + 1);
        }
        if (title < value) {
            let newArr = array.slice(middle + 1, to);
            return binaryFilter1(newArr, value, executionNumber + 1);
        }
        if (title === value) return [array[middle]];
        else return array;
    }
    /* Comments
        Things improved..
            1. Time complexity 
            2. Now the algorithm filter for values 

        Things to improve..
            1. Space complexity
                the algorithm creates a new array on every recursion
                recursion consumes the stack
            
            2. Time complexity
                startWith condition can cause the algorithm's time complexity scale to O(N)    
    */

//    -------------------------------------- Binary filter with while loop --------------------------------------
    const binaryFilter2 = (array: any[], value: string): [] | any[] => {
        let from = 0,
            to = array.length,
            matches: any[] = [],
            called = 0;

        while (from <= to) {
            let middle = Math.floor((from + to) / 2);

            //console.log(called++)
            //console.log(`from: ${from}, to: ${to} `)

            if (!array[middle]) {
                matches = []
                break
            }

            let title = array[middle].title.toLocaleLowerCase();

            if (title === value) {
                matches = [array[middle]]
                break
            }
            if (title.startsWith(value)) {
                const recipes: any[] = [];

                for (let i = from; i <= to; i++) {
                    const recipe = array[i];
                    //console.log('bucle for')

                    if (!recipe) continue
                    if (recipe.title.toLocaleLowerCase().startsWith(value)) recipes.push(recipe)
                }

                //console.log(array.slice(from, to))
                matches = recipes
                break
            }
            if (title > value) {
                to = middle - 1
            }
            if (title < value) {
                from = middle + 1
            }
            else matches = []
        }
        return matches
    }
    /* Comments 
        Things improved..
            1. Space complexity
                At the end the algorithm will return just one array or none
                No more recursion calls for the stack
    
        Things to improve..
            1. Time complexity
                startWith condition can cause the algorithm's time complexity scale to O(N)
    */

//    -------------------------------------- Binary filter optimized --------------------------------------
    const findRange1 = (array: any[], value: string, from: number, to: number, middle: number) => {
        let min = from,
            average = middle,
            max = to,
            leftBorder = 0,
            rigthBorder = 0,
            calledLeft = 1,
            calledRigth = 1;

        //left border
        while (true) {
            let leftMiddle = Math.floor((min + average) / 2)

            if (!array[leftMiddle]) break

            let title = array[leftMiddle].title.toLocaleLowerCase(),
                leftTitle = leftMiddle === from
                    ? array[leftMiddle].title.toLocaleLowerCase()
                    : array[leftMiddle - 1].title.toLocaleLowerCase(),
                rigthTitle = leftMiddle === middle
                    ? array[leftMiddle].title.toLocaleLowerCase()
                    : array[leftMiddle + 1].title.toLocaleLowerCase();

            if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                //nothing behind and nothing upfront ---> go forward
                min = leftMiddle + 1
            }
            if (title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                leftBorder = leftMiddle
                break
            }
            if (!title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                leftBorder = leftMiddle + 1
                break
            }
            if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                //coincidence behind and coincidence upfront ---> go back
                average = leftMiddle - 1
            }
        }

        //setting variables as the beggining
        average = middle

        //rigth border
        while (average <= max) {
            if (average === max) {
                //if average is equal max it means that it's just one element
                rigthBorder = max
                break
            }
            let rigthMiddle = Math.floor((average + max) / 2)

            if (!array[rigthMiddle]) break

            let title = array[rigthMiddle].title.toLocaleLowerCase(),
                leftTitle = rigthMiddle === middle
                    ? array[rigthMiddle].title.toLocaleLowerCase()
                    : array[rigthMiddle - 1].title.toLocaleLowerCase(),
                rigthTitle = rigthMiddle === to
                    ? array[rigthMiddle].title.toLocaleLowerCase()
                    : array[rigthMiddle + 1].title.toLocaleLowerCase();

            if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                //nothing behind and nothing upfront ---> go back
                max = rigthMiddle - 1
            }
            if (title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                rigthBorder = rigthMiddle
                break
            }
            if (!title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                rigthBorder = rigthMiddle - 1
                break
            }
            if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                //coincidence behind and coincidence upfront ---> go forward
                average = rigthMiddle + 1
            }
        }
        return array.slice(leftBorder, rigthBorder + 1) //plus 1 because slice is not inclusive
    }

    export const binaryFilter3 = (array: any[], value: string): [] | any[] => {
        let from = 0,
            to = array.length - 1,
            matches: any[] = [],
            called = 0;

        while (from <= to) {
            let middle = Math.floor((from + to) / 2);

            if (!array[middle]) {
                matches = []
                break
            }

            let title = array[middle].title.toLocaleLowerCase();

            if (title === value) {
                matches = [array[middle]]
                break
            }
            if (title.startsWith(value)) {
                matches = findRange1(array, value, from, to, middle)
                break
            }
            if (title > value) {
                to = middle - 1
            }
            if (title < value) {
                from = middle + 1
            } 
            else matches = []
        }

        return matches

    }

    /* Comments 
        Things improved..
            1. Time complexity of startsWith condition
                Now the time complexity it's O(2 log N) or O(log N) for this condition
    
        Things to improve..
            1. Abstraction of the algorithm so ANY ARRAY OF OBJECTS can use it
    */

//    -------------------------------------- Binary filter abstraction --------------------------------------
    const findRange = (array: any[], value: string, objKey: string, from: number, to: number, middle: number): any[] => {
        let min = from,
            average = middle,
            max = to,
            leftBorder = 0,
            rigthBorder = 0,
            calledLeft = 1,
            calledRigth = 1;

        //left border
        while (true) {
            let leftMiddle = Math.floor((min + average) / 2)

            if (!array[leftMiddle]) break

            let title = array[leftMiddle][`${objKey}`].toLocaleLowerCase(),
                leftTitle = leftMiddle === from
                    ? array[leftMiddle][`${objKey}`].toLocaleLowerCase()
                    : array[leftMiddle - 1][`${objKey}`].toLocaleLowerCase(),
                rigthTitle = leftMiddle === middle
                    ? array[leftMiddle][`${objKey}`].toLocaleLowerCase()
                    : array[leftMiddle + 1][`${objKey}`].toLocaleLowerCase();

            if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                //nothing behind and nothing upfront ---> go forward
                min = leftMiddle + 1
            }
            if (title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                leftBorder = leftMiddle
                break
            }
            if (!title.startsWith(value) && !leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                leftBorder = leftMiddle + 1
                break
            }
            if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                //coincidence behind and coincidence upfront ---> go back
                average = leftMiddle - 1
            }
        }

        //setting variables as the beggining
        average = middle

        //rigth border
        while (average <= max) {
            if (average === max) {
                //if average is equal max it means that it's just one element
                rigthBorder = max
                break
            }
            let rigthMiddle = Math.floor((average + max) / 2)

            if (!array[rigthMiddle]) break

            let title = array[rigthMiddle][`${objKey}`].toLocaleLowerCase(),
                leftTitle = rigthMiddle === middle
                    ? array[rigthMiddle][`${objKey}`].toLocaleLowerCase()
                    : array[rigthMiddle - 1][`${objKey}`].toLocaleLowerCase(),
                rigthTitle = rigthMiddle === to
                    ? array[rigthMiddle][`${objKey}`].toLocaleLowerCase()
                    : array[rigthMiddle + 1][`${objKey}`].toLocaleLowerCase();

            if (!leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                //nothing behind and nothing upfront ---> go back
                max = rigthMiddle - 1
            }
            if (title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                rigthBorder = rigthMiddle
                break
            }
            if (!title.startsWith(value) && leftTitle.startsWith(value) && !rigthTitle.startsWith(value)) {
                rigthBorder = rigthMiddle - 1
                break
            }
            if (leftTitle.startsWith(value) && rigthTitle.startsWith(value)) {
                //coincidence behind and coincidence upfront ---> go forward
                average = rigthMiddle + 1
            }
        }
        return array.slice(leftBorder, rigthBorder + 1) //plus 1 because slice is not inclusive
    }

    export const binaryFilter = (array: any[], value: string, objKey: string): [] | any[] => {
        let from = 0,
            to = array.length - 1,
            arrayFound: any[] = [],
            called = 1;

        while (from <= to) {
            let middle = Math.floor((from + to) / 2);

            if (!array[middle]) {
                arrayFound = []
                break
            }

            let title = array[middle][`${objKey}`].toLocaleLowerCase();

            if (title === value) {
                arrayFound = [array[middle]]
                break
            }
            if (title.startsWith(value)) {
                arrayFound = findRange(array, value, objKey, from, to, middle)
                break
            }
            if (title > value) {
                to = middle - 1
            }
            if (title < value) {
                from = middle + 1
            } 
            else arrayFound = []
        }

        return arrayFound
    }

    /* Comments 
        Time complexity
            O(3 log N) ---> O(log N)

    */

    

// -------------------------------------------------- Case 1 ----------------------------------------------------------
// Implement a binary tree in an array

//Time complexity ---> = O(N)
const binaryTree = (array) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (i !== 0) {
      //Parent Node (PN)
      const result = Math.floor((i - 1) / 2);
      element.PNIndex = result;
      element.PNValue = array[result].info;
    }
    if (2 * i + 1 < array.length) {
      //Left Child (LC)
      const result = Math.floor(2 * i + 1);
      element.LCIndex = result;
      element.LCValue = array[result].info;
    }
    if (2 * i + 2 < array.length) {
      //Rigth Child (RC)
      const result = Math.floor(2 * i + 2);
      element.RCIndex = result;
      element.RCValue = array[result].info;
    }
    if (i % 2 === 0 && i !== 0) {
      //Left Sibling (LS)
      const result = Math.floor(i - 1);
      element.LSIndex = result;
      element.LSValue = array[result].info;
    }
    if (i % 2 === 1 && i + 1 < array.length) {
      //Rigth Sibling (RS)
      const result = Math.floor(i + 1);
      element.RSIndex = result;
      element.RSValue = array[result].info;
    }
  }

  return array;
};

let arrayNumbers = [
  {
    info: 11,
  },
  {
    info: 1,
  },
  {
    info: 4,
  },
  {
    info: 9,
  },
  {
    info: 0,
  },
  {
    info: 3,
  },
  {
    info: 8,
  },
  {
    info: 5,
  },
  {
    info: 6,
  },
  {
    info: 7,
  },
  {
    info: 10,
  },
  {
    info: 2,
  },
];

binaryTree(arrayNumbers);

/* returns
[
    {
        "info": 11,
        "LCIndex": 1,
        "LCValue": 1,
        "RCIndex": 2,
        "RCValue": 4
    },
    {
        "info": 1,
        "PNIndex": 0,
        "PNValue": 11,
        "LCIndex": 3,
        "LCValue": 9,
        "RCIndex": 4,
        "RCValue": 0,
        "RSIndex": 2,
        "RSValue": 4
    },
    {
        "info": 4,
        "PNIndex": 0,
        "PNValue": 11,
        "LCIndex": 5,
        "LCValue": 3,
        "RCIndex": 6,
        "RCValue": 8,
        "LSIndex": 1,
        "LSValue": 1
    },
    {
        "info": 9,
        "PNIndex": 1,
        "PNValue": 1,
        "LCIndex": 7,
        "LCValue": 5,
        "RCIndex": 8,
        "RCValue": 6,
        "RSIndex": 4,
        "RSValue": 0
    },
    {
        "info": 0,
        "PNIndex": 1,
        "PNValue": 1,
        "LCIndex": 9,
        "LCValue": 7,
        "RCIndex": 10,
        "RCValue": 10,
        "LSIndex": 3,
        "LSValue": 9
    },
    {
        "info": 3,
        "PNIndex": 2,
        "PNValue": 4,
        "LCIndex": 11,
        "LCValue": 2,
        "RSIndex": 6,
        "RSValue": 8
    },
    {
        "info": 8,
        "PNIndex": 2,
        "PNValue": 4,
        "LSIndex": 5,
        "LSValue": 3
    },
    {
        "info": 5,
        "PNIndex": 3,
        "PNValue": 9,
        "RSIndex": 8,
        "RSValue": 6
    },
    {
        "info": 6,
        "PNIndex": 3,
        "PNValue": 9,
        "LSIndex": 7,
        "LSValue": 5
    },
    {
        "info": 7,
        "PNIndex": 4,
        "PNValue": 0,
        "RSIndex": 10,
        "RSValue": 10
    },
    {
        "info": 10,
        "PNIndex": 4,
        "PNValue": 0,
        "LSIndex": 9,
        "LSValue": 7
    },
    {
        "info": 2,
        "PNIndex": 5,
        "PNValue": 3
    }
]

*/

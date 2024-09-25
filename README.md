# Hash Function Concept in Pseudo-Code

This `generateHash` function takes two inputs: a string `input` and a `salt`. The hashing process involves several key steps, including character-to-code conversion, multiplication with prime numbers, reducing values, and generating a final hashed string. Below is the main idea of how the function works, described step-by-step in pseudo-code.

### Pseudo-Code:

    Function generateHash(input, salt):

    1. Initialize empty array inputArr.

    2. Concatenate input with salt to create a new string newInput.
    
    3. Loop through each character in newInput:
        a. Convert each character to its ASCII value.
        b. Store these values in inputArr.
    
    4. Define a fixed array outputArr consisting of prime numbers:
        - [2, 3, 5, 7, 11, ..., up to around 300]
    
    5. Define helper function smallify():
        a. Loop through each element in outputArr:
            i.  If the element is greater than 10,000, divide it by 100.
    
    6. Define core hashing logic function doHash():
        a. Set curentIndex to 0.
        b. Loop through each element of inputArr:
            i.  Multiply elements in outputArr with values from inputArr.
            ii. If curentIndex reaches the end of outputArr, reset curentIndex to 0.
            iii. Call smallify() after each multiplication round.
    
    7. Execute doHash() for the first pass.
    
    8. Sort inputArr in descending order.
    
    9. Reverse the order of outputArr.
    
    10. Execute doHash() for the second pass.
    
    11. Define function createFinalHash():
        a. Initialize empty string finalHash.
        b. Loop through outputArr:
            i.  Convert each value to a character using modulo arithmetic.
            ii. Ensure the value is within the ASCII range for alphanumeric characters (0-9, A-Z, a-z).
            iii. Append the character to finalHash.
    
    12. Return finalHash as the resulting hash.


### Key Steps:
- **Character-to-Code Conversion**: The input and salt are converted into an array of ASCII codes (`inputArr`).
- **Prime Multiplication**: These ASCII codes are then multiplied with an array of predefined prime numbers (`outputArr`), ensuring the values stay manageable by calling `smallify()` to reduce them when needed.
- **Multiple Hash Passes**: The hash function runs twice—once with the original `inputArr` and then again after sorting `inputArr` and reversing `outputArr`.
- **Final Hash Generation**: The resulting numbers in `outputArr` are converted into a mix of alphanumeric characters to produce the final hash string.

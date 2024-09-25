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


# Eksperimentinis tyrimas ir rezultatų analizė

## 1. Testinių įvedimo failų kūrimas

Sukurkite šiuos testinius failus:

- **Failai, sudaryti tik iš vieno simbolio:**
  - `simbolisA.txt`: failas, kuriame yra tik vienas simbolis, pvz., "A".
  - `simbolisB.txt`: failas, kuriame yra tik vienas simbolis, pvz., "B".

- **Failai, sudaryti iš daugiau nei 1000 atsitiktinai sugeneruotų simbolių:**
  - `atsitiktinai1000A.txt`: failas su daugiau nei 1000 atsitiktinai sugeneruotų simbolių.
  - `atsitiktinai1000B.txt`: kitas failas su daugiau nei 1000 atsitiktinai sugeneruotų simbolių.

- **Failai, sudaryti iš daugiau nei 1000 simbolių, bet skiriasi tik vienu simboliu:**
  - `vienodi1000A.txt`: failas su daugiau nei 1000 simbolių.
  - `vienodi1000B.txt`: failas, kuris nuo `vienodi1000A.txt` skiriasi tik vienu simboliu, pvz., simboliu vidurinėje pozicijoje.

- **Tuščias failas:**
  - `empty.txt`: failas, kuriame nėra jokių simbolių.

## 2. Testavimas naudojant sukurtus failus

Naudojant sukurtus failus kaip programos įvedimo duomenis, buvo atliekami šie tyrimai, siekiant patikrinti hash funkcijos deterministiškumą ir rezultatų dydį.

- **Failai su vienu simboliu:**
  - Hash for file `simbolisA.txt` is:  
    `uKedjhcfVUOECD973qececRPJDGA42rpjfXTRNLTYKrdxUGaLEfyWIcNcrGdvb7h`
  - Hash for file `simbolisB.txt` is:  
    `1QekpoifccWMKDGEAwkiecXVPJEF97vtnjaWUQOKHqBkxIr6dDXf7fmLTXc1EoEl`

- **Failai su daugiau nei 1000 atsitiktinai sugeneruotų simbolių:**
  - Hash for file `atsitiktinai1000A.txt` is:  
    `sdvQYdrfFg2CpOUQdkQha8HdwZEGrbW7vxMuy1kRh0vGLNdeGEQiBAc9iEY5elSr`
  - Hash for file `atsitiktinai1000B.txt` is:  
    `mmhu1LefCGxtNFvYuLRccKyQ8qxtx0U2GmEOEeQ7GARcbGECu4221UG2AGk3OOGh`

- **Failai su daugiau nei 1000 simbolių, bet skiriasi vienu simboliu:**
  - Hash for file `vienodi1000A.txt` is:  
    `TbfcJbCaVC72BpV4p2SfNduuquNAVT18Z1dOQlbPeL1LJlosWPv4WGBCB0s4fblV`
  - Hash for file `vienodi1000B.txt` is:  
    `E4daLKafALq8wHpMpnBWQLdA3J1uoK2qCcaTqbD1gndaZfddWVOBTdBesvHElAED`

- **Tuščias failas:**
  - Hash for file `empty.txt` is:  
    `bCajrphcUF8jeWMIFlPKACnjaMC5qlTOA7fVQHCApbXJECwsdVLXcFgJONmS1Q5q`

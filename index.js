const fs = require('node:fs');
const path = require('path');

//for making random test strings
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

//for file processing
function processFile(fileName){
    try {
        const filePath = path.join(__dirname, `${fileName}`);
        const data = fs.readFileSync(filePath, 'utf8');
        return {code: 0, data: data};
    } catch (err) {
        return {code: 1};
    }
}

//main hashing function
function generateHash(input, salt){
    let inputArr = [];
    let newInput = input + salt;
    for (let index = 0; index < newInput.length; index++) {
        inputArr.push(newInput.charCodeAt(index))
    }
    const outputArr = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 
        59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 
        127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 
        191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 
        257, 263, 269, 271, 277, 281, 283, 293, 307, 311
    ];

    function smallify(){
        for (let index = 0; index < outputArr.length; index++) {
           while (outputArr[index] > 10000) {
            outputArr[index] = outputArr[index] / 100;
           }
        }
    }

    function doHash(){
        let curentIndex = 0;
        for (let index = 0; index < inputArr.length; index++) {
            if (curentIndex !== outputArr.length - 1) {
                for (let secondIndex = curentIndex; secondIndex < outputArr.length; secondIndex++) {
                    outputArr[secondIndex] = outputArr[secondIndex] * inputArr[index];
                }
                smallify();
                curentIndex++;
            }else{
                curentIndex = 0;
                index--;
            }
        }
    }

    function createFinalHash(){
        let finalHash = '';
        for (let index = 0; index < outputArr.length; index++) {
            let char = 48 + Math.floor(outputArr[index] % 74);
            if (char > 57 && char < 65) {
                char += 7;
            }else if(char > 90 && char < 97){
                char += 6;
            }
            finalHash += String.fromCharCode(char); 
        }

        return finalHash;
    }

    doHash();

    inputArr.sort((a, b) => b - a);

    outputArr.reverse();

    doHash();

    return createFinalHash();
}


//main scenario
console.clear();
let haveComandLineArgument = false;
process.argv.forEach(function (val, index, array) {
    if (index > 1) {
        haveComandLineArgument = true;
        const processFileData = processFile(val);
        if (processFileData.code === 0) {
            console.log(`Hash for file ${val} is: ${generateHash(processFileData.data)}`); 
        }else{
            console.log(`Hash for text ${val} is: ${generateHash(val)}`);     
        }
    }
});


//testing scenario
if (!haveComandLineArgument) {
    let fail = false;
    for (let index = 0; index < 1000; index++) {
        const text = makeid(1000);
        console.log(`${index+1}: ${generateHash(text, 'a')}`);
        if (generateHash(text, 'a') !== generateHash(text, 'a')) {
            fail = true;
        }
    }
    fail ? console.log('ERROR: hash has been found to be repeatable.') : console.log('No hash has been found to be not repeatable.'); 
}
const fs = require('node:fs');
const path = require('path');
const crypto = require('node:crypto');

function md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function sha256(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function sha1(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
}

function hexStringToBytes(hexString) {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return bytes.join('');
}

function getLevenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,     
                matrix[i][j - 1] + 1,     
                matrix[i - 1][j - 1] + cost 
            );
        }
    }

    return matrix[len1][len2];
}

function similarityPercentage(str1, str2) {
    const distance = getLevenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    
    if (maxLength === 0) return 100;
    const similarity = ((maxLength - distance) / maxLength) * 100;
    
    return similarity.toFixed(2);
}

//random number fuction
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

function readNumberOfLines(numberOfLines){
    const filePath = path.join(__dirname, 'konstitucija.txt');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines = file.split('\n');
    let result = '';
    for (let i = 0; i < numberOfLines; i++) {
        result += lines[i];
    }
    return result;
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
        const allHexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        for (let index = 0; index < outputArr.length; index++) {
            finalHash += allHexValues[Math.floor(outputArr[index] % 16)]; 
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
let expectVal = false;
process.argv.forEach(function (val, index, array) {
    if (index > 1) {
        haveComandLineArgument = true;
        if (expectVal) {
            switch (val) {
                case '1':
                    for (let index = 1; index <= 10000; index=index*2) {
                        const textLines = readNumberOfLines(index);
                        console.time(`Number of lines: ${index}`);
                        generateHash(textLines);
                        console.timeEnd(`Number of lines: ${index}`);
                    }
                    break;

                case '2':
                    {
                        let fail = false;
                        for (let index = 0; index < 100000; index++) {
                            const ranInt = randomIntFromInterval(10, 1000);
                            let text1 = makeid(ranInt);
                            let text2 = makeid(ranInt);
                            while (text1 === text2) {
                                text1 = makeid(ranInt);
                                text2 = makeid(ranInt);
                            }
                            console.log(`${index+1}: ${generateHash(text1)}  ${generateHash(text2)} Random string size: ${ranInt}`);
                            if (generateHash(text1) === generateHash(text2)) {
                                fail = true;
                            }
                        }
                        fail ? console.log('ERROR: match found!') : console.log('SUCCESS: no match found!'); 
                    }
                    break;

                case '3': // hex comparison
                    {
                        let fail = false;
                        let min = 100;
                        let max = 0;
                        let averages = [];
                        for (let index = 0; index < 100000; index++) {
                            const ranInt = randomIntFromInterval(10, 1000);
                            let text1 = 'a' + makeid(ranInt);
                            let text2 = 'b' + makeid(ranInt);
                            console.log(`${index+1}: ${generateHash(text1)}  ${generateHash(text2)} Random string size: ${ranInt}`);
                            if (generateHash(text1) === generateHash(text2)) {
                                fail = true;
                            }
                            const similarity = similarityPercentage(text1, text2);
                            if (similarity < min) {
                                min = similarity;
                            }
                            if (similarity > max) {
                                max = similarity;
                            }
                            averages.push(similarity);
                        }
                        console.log(`Min similarity: ${min}%`);
                        console.log(`Max similarity: ${max}%`);
                        let sum = 0;
                        for (let index = 0; index < averages.length; index++) {
                            sum += Number(averages[index]);
                        }
                        console.log(`Average similarity: ${(sum / averages.length).toFixed(2)}%`);
                        fail ? console.log('ERROR: match found!') : console.log('SUCCESS: no match found!'); 
                    }
                    break;

                    case '4': // bytes comparison
                    {
                        let fail = false;
                        let min = 100;
                        let max = 0;
                        let averages = [];
                        for (let index = 0; index < 100000; index++) {
                            const ranInt = randomIntFromInterval(10, 1000);
                            let text1 = 'a' + makeid(ranInt);
                            let text2 = 'b' + makeid(ranInt);
                            console.log(`${index+1}: ${generateHash(text1)}  ${generateHash(text2)} Random string size: ${ranInt}`);
                            if (generateHash(text1) === generateHash(text2)) {
                                fail = true;
                            }
                            const similarity = similarityPercentage(hexStringToBytes(text1), hexStringToBytes(text2));
                            if (similarity < min) {
                                min = similarity;
                            }
                            if (similarity > max) {
                                max = similarity;
                            }
                            averages.push(similarity);
                        }
                        console.log(`Min similarity: ${min}%`);
                        console.log(`Max similarity: ${max}%`);
                        let sum = 0;
                        for (let index = 0; index < averages.length; index++) {
                            sum += Number(averages[index]);
                        }
                        console.log(`Average similarity: ${(sum / averages.length).toFixed(2)}%`);
                        fail ? console.log('ERROR: match found!') : console.log('SUCCESS: no match found!'); 
                    }
                    break;

                default:
                    console.log('ERROR: unknown test type');
                    break;
            }
        }else{
            if (val === '-t') {
                expectVal = true;
            }else{
                const processFileData = processFile(val);
                if (processFileData.code === 0) {
                    console.log(`Hash for file ${val} is: ${generateHash(processFileData.data)}`); 
                }else{
                    console.log(`Hash for text ${val} is: ${generateHash(val)}`);     
                }
            }
        }   
    }
});

if (!haveComandLineArgument) {
    console.log('ERROR: no command line arguments');
}
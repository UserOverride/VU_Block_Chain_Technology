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

function generateHash(input){
    let inputArr = [];
    for (let index = 0; index < input.length; index++) {
        inputArr.push(input.charCodeAt(index))
    }
    const outputArr = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 
        59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 
        127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 
        191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 
        257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317
    ];

    let curentIndex = 0;
    for (let index = 0; index < inputArr.length; index++) {
        if (curentIndex !== outputArr.length - 1) {
            for (let secondIndex = curentIndex; secondIndex < outputArr.length; secondIndex++) {
                outputArr[secondIndex] = outputArr[secondIndex] + inputArr[index];
            }
            curentIndex++;
        }else{
            curentIndex = 0;
            index--;
        }
    }

    inputArr.sort((a, b) => b - a);

    outputArr.reverse();

    curentIndex = 0;
    for (let index = 0; index < inputArr.length; index++) {
        if (curentIndex !== outputArr.length - 1) {
            for (let secondIndex = curentIndex; secondIndex < outputArr.length; secondIndex++) {
                outputArr[secondIndex] = outputArr[secondIndex] + inputArr[index];
            }
            curentIndex++;
        }else{
            curentIndex = 0;
            index--;
        }
    }

    let finalHash = '';
    for (let index = 0; index < outputArr.length; index++) {
        let char = 48 + (outputArr[index] % 74);
        if (char > 57 && char < 65) {
            char += 7;
        }else if(char > 90 && char < 97){
            char += 6;
        }
        finalHash += String.fromCharCode(char); 
    }

    return finalHash;
}

for (let index = 0; index < 1000; index++) {
    console.log(`${index+1}: ${generateHash(makeid(1000))}`)
}
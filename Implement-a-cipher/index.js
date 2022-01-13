function ceaserCipherEncrypt(string){
    var upperCaseStr = string.toUpperCase();
    // var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    var newString = " ";
    for(let i = 0;i < upperCaseStr.length; i++){
        var currentLetter = upperCaseStr[i];
        if(currentLetter === " "){
            newString += currentLetter;
            continue;
        }

        var currentIndex = alphabet.indexOf(currentLetter);
        var newIndex = (currentIndex + 3)%26;
        if(string[i] === string[i].toLowerCase()){
            newString += alphabet[newIndex].toLowerCase();
        }else{
            newString += alphabet[newIndex];
        }
    }
    return newString;
}

function ceaserCipherDecrypt(string){
    var upperCaseStr = string.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    // var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    var newString = "";
    for(let i = 0;i < upperCaseStr.length; i++){
        var currentLetter = upperCaseStr[i];
        if(currentLetter === " "){
            newString += currentLetter;
            continue;
        }

        var currentIndex = alphabet.indexOf(currentLetter);
        var dividend = currentIndex-3;
        if(dividend < 0){
            var newIndex = (dividend + 26)%26;
        }else{
            var newIndex = dividend%26;
        }
        if(string[i] === string[i].toUpperCase()){
            newString += alphabet[newIndex].toUpperCase();
        }else{
            newString += alphabet[newIndex];
        }
    }
    return newString;
}

console.log("Encryption of Plain text is: "+ceaserCipherEncrypt("Vicky Gupta"));
console.log("Decryption of Cipher text is: " +ceaserCipherDecrypt("Ylfnb Jxswd"));
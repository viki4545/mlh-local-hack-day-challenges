function crypt(){
    let password = document.querySelector("#user-password");
    let cipher = CryptoJS.AES.encrypt(password.value, "CIPHERKEY");
    cipher = cipher.toString();
    password.value = "";
    return cipher;
}
let ans = crypt();
console.log(ans);

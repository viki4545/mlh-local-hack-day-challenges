
function calculatePi(n){
    if(n === 0 || n < 1){
        n = 1;
    }

    return (16 * Math.atan(1/5) - 4 * Math.atan(1/239)).toFixed(n);
    
}

document.getElementById("submit").addEventListener("click", function(){
    var res = document.getElementById("digits").value;
    document.getElementById("result").innerHTML = calculatePi(res);
});

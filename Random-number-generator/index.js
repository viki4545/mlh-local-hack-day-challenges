function generateRandomNumbers(start){
    var self = this;
    if(start == null){
        start = Date.now();
    }
    
    var a = 1103515245; //multiplier
    var c = 12345; //incrementer
    var m = 2147483647 // modulo(max int range)

    self.nextInt = function() {
        start = (start * a + c) % m;
        return start;
    };

    self.nextDouble = function(){
        var value = self.nextInt();
        return value/m;
    };
}

var random = new generateRandomNumbers();

console.log(random.nextInt());
console.log(random.nextInt());
console.log(random.nextInt());

console.log(random.nextDouble());
console.log(random.nextDouble());
console.log(random.nextDouble());
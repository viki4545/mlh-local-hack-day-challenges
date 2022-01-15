// Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("sounds/food.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");
const moveSound = new Audio("sounds/move.mp3");
const bgSound = new Audio("sounds/background.mp3");
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};

// Game Functions
function main (ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;  
    gameEngine();
}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
    // if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

}

function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        bgSound.play();
        score = 0;
    }

    // if you have eaten the food, increase the score and regenerate the snake
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        if(score > hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
            hiScoreText.innerHTML = "HiScore: " + hiScoreVal;
        }
        scoreText.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    
    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


// Main logic starts here
bgSound.play();
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
}else{
    hiScoreVal = JSON.parse(hiScore);
    hiScoreText.innerHTML = "HiScore: " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp key is pressed!"); 
            inputDir.x = 0;
            inputDir.y = -1; 
            break;

        case "ArrowDown":
            console.log("ArrowDown key is pressed!");
            inputDir.x = 0;
            inputDir.y = 1;   
            break;

        case "ArrowLeft":
            console.log("ArrowLeft key is pressed!");
            inputDir.x = -1;
            inputDir.y = 0;   
            break;

        case "ArrowRight":
            console.log("ArrowRight key is pressed!");
            inputDir.x = 1;
            inputDir.y = 0;   
            break;

        default:
            break;
    }
});

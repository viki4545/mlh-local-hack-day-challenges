const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const compScoreSpan = document.querySelector("[data-comp-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");
const SELECTIONS = [
    {
        name: "rock",
        emoji: "✊",
        beats: "scissors"
    },
    {
        name: "paper",
        emoji: "🤚",
        beats: "rock"
    },
    {
        name: "scissors",
        emoji: "✌",
        beats: "paper"
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener("click", (e) =>{
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection); 
    });
});

function makeSelection(selection){
    const compSelection = randomSelection();
    const yourWinner = isWinner(selection,compSelection);
    const compWinner = isWinner(compSelection,selection);
    
    addSelectionResult(compSelection,compWinner);
    addSelectionResult(selection,yourWinner);

    if(yourWinner){
        incrementScore(yourScoreSpan);
    }
    if(compWinner){
        incrementScore(compScoreSpan);
    }
};

function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText)+1;
}

function addSelectionResult(selection, winner){
    const div = document.createElement("div");
    div.textContent = selection.emoji;
    div.classList.add("result-selection");
    if(winner) div.classList.add("winner");
    finalColumn.after(div);
};

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name;
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random()*SELECTIONS.length);
    return SELECTIONS[randomIndex];
};
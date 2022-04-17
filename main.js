// Create Array Contain All Words 
let words = [
    "Account",
    "Accurate",
    "Accuse",
    "Achieve",
    "Achievement",
    "Acid",
    "Acknowledge",
    "Acquire",
    "Across",
    "Act",
    "Action",
    "Active",
    "Activist",
    "Activity",
    "Actor",
    "Actress",
    "Actual",
    "Actually",
    "Addtion",
    "Adapt",
    "Add",
    "Addition",
    "Expensive",
    "Adjustment",
    "Administration",
    "Administrator",
    "Find",
    "Finding",
    "Fine",
    "Finger"
]
// Catch Selector
let startBtn = document.querySelector(".start");
let label = document.querySelector("label");
let levelSelect = document.getElementById("levels");
let levelNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotle = document.querySelector(".score .totle");
let finishMessage = document.querySelector(".finish");
let reset = document.querySelector(".finish .reset");
// Create function Contain All levels To choose Your Level
function chooseLevel() {
    let i = levelSelect.selectedIndex;
    levelNameSpan.innerHTML = levelSelect.options[i].text;
    secondSpan.innerHTML = levelSelect.options[i].value;
    timeLeftSpan.innerHTML = levelSelect.options[i].value;
}
levelSelect.onchange = function () {
    return chooseLevel();
}
// Create Object Contain All levels
let levels = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2,
}
// Setting Defualt Level Name & Time
let defualtLevelName = "Normal";
let defualtLevelTime = levels[defualtLevelName];
// Setting Level Name + Second + Score
levelNameSpan.innerHTML = defualtLevelName;
secondSpan.innerHTML = defualtLevelTime;
timeLeftSpan.innerHTML = defualtLevelTime;
scoreTotle.innerHTML = words.length;
//Disable Paste Event
input.onpaste = function () {
    return false;
}
// Start Game
startBtn.onclick = function () {
    theWord.style.display = "block";
    // this.remove();
    this.style.display = "none";
    label.style.display = "none";
    levelSelect.style.display = "none";
    input.focus();
    genWords();
    chooseLevel();
}
// Create genWord Function
function genWords () {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";
    for(let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    startPlay();
}
// Create startPlay Function To Play
function startPlay () {
    timeLeftSpan.innerHTML = defualtLevelTime;
    let start = setInterval( () => {
        timeLeftSpan.innerHTML--;
        reset.disabled = true;
        if( timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            reset.disabled = false;
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                scoreGot.innerHTML++;
                if(words.length > 0 ) {
                    genWords();
                    chooseLevel();
                }else {
                    let span = document.createElement("span");
                    let spanTxt = document.createTextNode("Congratulations");
                    span.classList = "good";
                    span.appendChild(spanTxt);
                    finishMessage.prepend(span);
                    upcomingWords.remove();
                    reset.addEventListener("click", () => {
                        return span.remove();
                    });
                }
            }else {
                let span = document.createElement("span");
                let spanTxt = document.createTextNode("Game Over");
                span.classList = "bad";
                span.appendChild(spanTxt);
                finishMessage.prepend(span);
                reset.addEventListener("click", () => {
                    return span.remove();
                });
            }
        }
    }, 1000)
}
// Reset The Game
reset.onclick = function resetGame() {
    // theWord.remove();
    theWord.style.display = "none";
    startBtn.style.display = "block";
    label.style.display = "block";
    levelSelect.style.display = "block";
    upcomingWords.innerHTML = "";
    upcomingWords.innerHTML = "Words Will Show Here";
    scoreGot.innerHTML = "0";
    input.value = "";
    timeLeftSpan.innerHTML = document.getElementById("levels").options[levelSelect.selectedIndex].value;
}
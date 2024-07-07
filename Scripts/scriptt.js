document.addEventListener("DOMContentLoaded", function () {

    async function checkWordExists(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return response.ok;
    }
    const gridElement = document.getElementById('grid');
    const keys = document.querySelectorAll('.key');
    const enterKey = document.getElementById('enter');
    const backspaceKey = document.getElementById('backspace');

    const trials = 6;
    const wordLength = 5;

    let grid = Array(trials).fill().map(() => Array(wordLength).fill(''));
    let currentTrial = 0;
    let currentTile = 0;
    function todaysWord() {
        let todayssWord = 'MIGHT';
        return todayssWord;
    }   ///generate a new wordd 
    todaysWord();

    function draw() {
        for (let i = 0; i < trials; i++) {
            for (let j = 0; j < wordLength; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.id = `tile-${i}-${j}`;
                gridElement.appendChild(tile);
            }
        }
    }

    function updateTile(letter) {
        if (currentTrial >= trials) {
            alert("The word was bla bla!\nBetter luck next time");  //change later- handle the losing 
            return;
        }
        if (currentTile < wordLength) {
            grid[currentTrial][currentTile] = letter;
            const tile = document.getElementById(`tile-${currentTrial}-${currentTile}`);
            tile.textContent = letter;
            currentTile++;
        }
    }
    function handleBackspace() {
        if (currentTile > 0) {
            currentTile--;
            grid[currentTrial][currentTile] = '';
            const tile = document.getElementById(`tile-${currentTrial}-${currentTile}`);
            tile.textContent = '';
        }
    }


    async function checkWordExists(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return response.ok;
    }

    function handleEnter() {
        if (currentTile === wordLength) {
            checkWord();
            currentTrial++;
            currentTile = 0;
        }else if (currentTrial >= trials) {
            alert("The word was bla bla!\nBetter luck next time");  //change later- handle the losing 
            return;
        }
        else {
            alert("Not enough letters");
        }
    }


    async function checkWord() {
        let guessedWord = '';
        for (let i = 0; i < wordLength; i++) {
            guessedWord += grid[currentTrial][i];
        }
        const wordExists = await checkWordExists(guessedWord);
        if (wordExists) {
            console.log("Word exists");  //why pause?
        } else {
            alert("Word doesnot exist");     
        }
        let heute = todaysWord();
        console.log(guessedWord);  ///check with today's word 
        console.log(heute);
        if (heute==guessedWord) {
            alert("YAAYY you guessed it correctly!!");   //handle this - winning 
            return;
        }
       
    }

    

    keys.forEach(key => {
        key.addEventListener('click', () => {
            updateTile(key.textContent);
        });
    });

    
    backspaceKey.addEventListener('click', handleBackspace);
    enterKey.addEventListener('click', handleEnter);
    draw();


    
});
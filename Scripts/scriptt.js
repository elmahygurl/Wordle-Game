document.addEventListener("DOMContentLoaded", function () {


    const gridElement = document.getElementById('grid');
    const keys = document.querySelectorAll('.key');
    const enterKey = document.getElementById('enter');
    const backspaceKey = document.getElementById('backspace');

    const trials = 6;
    const wordLength = 5;

    let grid = Array(trials).fill().map(() => Array(wordLength).fill(''));
    let currentTrial = 0;
    let currentTile = 0;
    const wordList = [
        "MIGHT", "TRACE", "PLANT", "CHAMP", "SLICE",
        "BRAVE", "CRANE", "GHOST", "RIVER", "SHINE",
        "PLUMB", "SHEEP", "FROST", "BREAD", "TREAT",
        "EMAIL", "NAIVE", "OPERA", "ABUSE", "NOISE",
        "JUICE", "MOVIE", "SAUCE", "VIDEO", "OLIVE",
        "GREEN", "SNACK", "LONER"
    ];
    //let heute;
    //async function getWordOfToday() {
    //    try {
    //        console.log("in a function")
    //        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    //        const data = await response.json();
    //        console.log("dataa", data)

    //        heute = data[0].toUpperCase();
    //    } catch (error) {
    //        console.error('Error fetching word:', error);
    //        heute = 'MOVIE';
    //    }
        //try {
        //    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
        //    if (!response.ok) {
        //        throw new Error('Failed to fetch word');
        //    }
        //    const data = await response.json();
        //    return data[0].toUpperCase();
        //} catch (error) {
        //    console.error('Error fetching word:', error);
        //    const today = new Date();
        //    const start = new Date(today.getFullYear(), 0, 0);
        //    const diff = today - start;
        //    const oneDay = 1000 * 60 * 60 * 24;
        //    const dayOfYear = Math.floor(diff / oneDay);
        //    const index = dayOfYear % wordList.length;
        //    return wordList[index];
  
        //}
    //}
    //getWordOfToday();
   

    function getWordOfTheDay() {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const index = dayOfYear % wordList.length;
        console.log("index:",index);
        return wordList[index];
    }

    let heute = getWordOfTheDay();
    console.log('Today\'s word is:', heute);
    

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
            alert("The word was " + heute + "\nBetter luck tomorrow");  //change later- handle the losing 
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

    async function handleEnter() {
        if (currentTile === wordLength) {
            const guessedWord = grid[currentTrial].join('');
            const wordExists = await checkWordExists(guessedWord);

            if (!wordExists) {
                alert("Word does not exist");
                return;
            }

            const correctWord = heute.toUpperCase();
            let correctLetters = Array(wordLength).fill(false);

            for (let j = 0; j < wordLength; j++) {
                const guessedLetter = grid[currentTrial][j].toUpperCase();
                const correctLetter = correctWord[j];
                const tile = document.getElementById(`tile-${currentTrial}-${j}`);
                const key = document.querySelector(`.key[data-key="${guessedLetter}"]`);

                if (guessedLetter === correctLetter) {
                    tile.classList.add('correct');
                    key.classList.remove('out-of-place');
                    key.dataset.state = "2";
                    key.classList.add('correct');
                    correctLetters[j] = true;
                }
            }
            
            for (let j = 0; j < wordLength; j++) {
                const guessedLetter = grid[currentTrial][j].toUpperCase();
                const tile = document.getElementById(`tile-${currentTrial}-${j}`);
                const key = document.querySelector(`.key[data-key="${guessedLetter}"]`);

                if (!tile.classList.contains('correct')) {
                    if (correctWord.includes(guessedLetter)) {
                        let correctIndex = correctWord.indexOf(guessedLetter);
                        console.log("Correct index of ", guessedLetter, "is", correctIndex);
                        while (correctLetters[correctIndex]) {
                            console.log(" bnd5ol hena at ", guessedLetter);
                            correctIndex = correctWord.indexOf(guessedLetter, correctIndex + 1);
                            if (correctIndex === -1) break;
                        }
                        if (correctIndex !== -1 && !correctLetters[correctIndex]) {
                            tile.classList.add('out-of-place');
                            if (key.dataset.state == 2) {
                            }
                            else {
                                key.dataset.state == 1;
                                key.classList.add('out-of-place');
                                correctLetters[correctIndex] = true;
                            }
                        } else {
                            console.log("in the not in word")
                            tile.classList.remove('correct');
                            tile.classList.add('not-in-word');
                            
                            if (key.dataset.state <1) {
                                key.classList.add('not-in-word');
                                key.dataset.state = "0";
                            }
                        }
                    } else {
                        console.log("The letter ", guessedLetter, "does not exist in the word");
                        tile.classList.add('not-in-word');  
                        key.classList.add('not-in-word');

                    }
                }
            }
            if (guessedWord.toUpperCase() === correctWord) {
                alert("YAAYY you guessed it correctly!!\n Come back tomorrow 🙂");
                return;
            }

            currentTrial++;
            currentTile = 0;

        } else if (currentTrial >= trials) {
            alert("The word was " + heute + "\nBetter luck tomorrow");  //change later- handle the losing 
            return;
        }
        else {
            alert("Not enough letters");
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
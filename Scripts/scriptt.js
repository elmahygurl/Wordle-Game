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
    //const wordList = [];
    let heute;
    let pastTrials = [];  //so loading gets previous trials 
    function loadGameState() {
        const savedState = localStorage.getItem('wordleGameState');
        if (savedState) {
            const state = JSON.parse(savedState);
            if (state.date === new Date().toDateString() && state.trials >= trials) {
                alert("Tomorrow is a new day with a new challenge!");
                return true;
            }
        }
        return false;
    }

    function saveGameState() {
        const state = {
            date: new Date().toDateString(),
            trials: currentTrial
        };
        localStorage.setItem('wordleGameState', JSON.stringify(state));
        localStorage.set
    }

    async function getWordOfTheDay() {
        try {
            const response = await fetch('sgb-words.txt');
            if (!response.ok) {
                throw new Error('Failed to fetch word list');
            }
            const text = await response.text();
            const wordList = text.split('\n').map(word => word.trim().toUpperCase());
            const today = new Date();
            const start = new Date(today.getFullYear(), 0, 0);
            const diff = today - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);
            const index = dayOfYear % wordList.length;
            return wordList[index];
        } catch (error) {
            console.error('Error fetching word list:', error);
            return 'MOVIE';
        }
    }

    getWordOfTheDay().then(word => {
        heute = word;
        console.log('Today\'s word is:', heute);
        if (loadGameState()) {
            return;
        }
    });

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
            alert("The word was " + heute + "\nBetter luck tomorrow!");
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
            pastTrials[currentTrial] = guessedWord;
            for (let j = 0; j < wordLength; j++) {
                const guessedLetter = grid[currentTrial][j].toUpperCase();
                const correctLetter = correctWord[j];
                const tile = document.getElementById(`tile-${currentTrial}-${j}`);
                const key = document.querySelector(`.key[data-key="${guessedLetter}"]`);

                if (guessedLetter === correctLetter) {
                    tile.classList.add('correct');
                    key.classList.remove('out-of-place', 'not-in-word');
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
                                key.classList.remove('not-in-word', 'out-of-place');
                                key.classList.add('correct');
                            }
                            else {
                                key.dataset.state = 1;
                                key.classList.remove('not-in-word');
                                key.classList.add('out-of-place');
                                correctLetters[correctIndex] = true;
                                console.log("key state now = ", key.dataset.state, " of guessed letterrrrr ", guessedLetter)
                            }
                        } else {
                            console.log("in the not in word")
                            tile.classList.remove('correct');
                            tile.classList.add('not-in-word');

                            if (key.dataset.state < 1) {
                                key.classList.add('not-in-word');
                                key.dataset.state = 0;
                            }
                        }
                    } else {
                        console.log("The letter ", guessedLetter, "does not exist in the word");
                        tile.classList.add('not-in-word');
                        console.log("key state now = ", key.dataset.state, " of guessed letter ", guessedLetter)
                        if (key.dataset.state < 1) {
                            key.classList.add('not-in-word');
                            key.dataset.state = 0;
                        }
                    }
                }
            }
            if (guessedWord.toUpperCase() === correctWord) {
                alert("YAAYY you guessed it correctly!!\n Come back tomorrow 🙂");
                saveGameState();
                return;
            }
            currentTrial++;
            currentTile = 0;
            saveGameState();
        } else if (currentTrial >= trials) {
            alert("The word was " + heute + "\nBetter luck tomorrow!");
            saveGameState();
            return;
        }
        else {
            alert("Not enough letters");
        }

        console.log("0 - ", pastTrials[0])
        console.log("1 - ", pastTrials[1])
        console.log("2 - ", pastTrials[2])
        console.log("3 - ", pastTrials[3])
        console.log("4 - ", pastTrials[4])
        console.log("5 - ", pastTrials[5])
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
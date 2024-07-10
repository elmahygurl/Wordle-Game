# Wordle Clone

A web-based clone of the popular word puzzle game Wordle. 
The game selects a word of the day and allows players to guess the word within six trials. 

## Features

- Random word of the day chosen from the text file `sgb-words.txt`.
- Six attempts to guess the word.
- Visual feedback for each guessed letter:
  - Correct letters in the correct position.
  - Correct letters in the wrong position.
  - Incorrect letters.
- Saves the game state to local storage to persist progress.
- Prevents guessing once the word is correctly guessed or trials are exhausted.

## Example 
![image](https://github.com/elmahygurl/Wordle-Game/blob/master/example.JPG)

## Getting Started

### Prerequisites

- A web browser (e.g., Chrome, Firefox, Edge).
- A local server or a way to serve the HTML file (optional for local development).

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/elmahygurl/Wordle-Game
    ```

2. **Navigate to the project directory:**

    ```sh
    cd Wordle-Game
    ```

3. **Open `index.html` in a web browser:**

    - Double-click on `index.html` to open it directly in your default web browser.
    - Alternatively, use a local server to serve the file.


### Usage

1. Open the game in your browser.
2. Use the on-screen keyboard or your physical keyboard to input guesses.
3. Click the "Enter" button to submit your guess.
4. The game will provide feedback for each letter in the guessed word:
    - Green: Correct letter in the correct position.
    - Yellow: Correct letter in the wrong position.
    - Grey: Incorrect letter.
5. Continue guessing until you find the correct word or exhaust all six trials.
6. Your progress is saved automatically. Reloading the page will maintain your current game state.


## Acknowledgments

- Inspired by the original Wordle game by Josh Wardle.
- Uses the `dictionaryapi.dev` API for word existence validation.

const prompt = require('prompt-sync')(); // Import prompt-sync
const fs = require('fs');
// Main Game Logic
function startGame() {
    // Entry point for the game
    console.log("Welcome to the Number Guessing Game!");

    console.log("\nPlease select a difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)\n");


    let values = selectDifficulty();
    let chances = values[0];
    const difficulty = values[1];
    const firstChancesValue = chances; // Store initial chances for high score tracking
    const randomNumber = generateRandomNumber();
    console.log(randomNumber); // For debugging purposes, remove in production
    let startTime = startTimer();
    console.log("I'm thinking of a number between 1 and 100.");
    while (chances > 0) {

        const guess = Number(getPlayerGuess());
if (checkWinCondition(guess, randomNumber)) {
    const timeTaken = endTimer(startTime);
    const attemptsUsed = firstChancesValue - chances + 1; // Add +1 to fix the count
    console.log(`Congratulations! You guessed the correct number in ${attemptsUsed} attempts.`);
    trackHighScore(attemptsUsed, timeTaken, parseInt(difficulty));
    playAgain();
        } else {
           provideFeedback(guess, randomNumber, chances, difficulty);
            chances--;
            console.log(`You have ${chances} chances left.\n`);
            if (chances === 0) {
                console.log("You've run out of chances!");
            }
        }

    }

    console.log(`Sorry, you've run out of chances. The correct number was ${randomNumber}. Better luck next time!`);
    playAgain();
}

// Difficulty Levels
function selectDifficulty() {
    const difficulty = prompt("Enter your choice (1-3): ");
    let difficultyName;
    let chances;
    switch(difficulty){
        case '1':
            difficultyName = "Easy"
            chances = 10;
            break;
        case '2':
            difficultyName = "Medium";
            chances = 5;
            break;
        case '3':
            difficultyName = "Hard";
            chances = 3;
            break;
        default:
            console.log("Invalid choice, defaulting to Easy level.");
            difficultyName = "Easy";
            chances = 10;
    }
    console.log(`\nGreat! You have selected the ${difficultyName} difficulty level.`);
    console.log(`You have ${chances} chances to guess the correct number.\nLet's start the game!\n`);
    return [chances,difficulty];
    }

// Random Number Generation
function generateRandomNumber() {
    // Generate a random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}

// Player Input
function getPlayerGuess() {
    // Logic to get the player's guess
    return prompt("Enter your guess (1-100): ")
}

// Feedback System
function provideFeedback(guess, randomNumber, chances, difficulty) {
    if (chances-1 === 1) {
        console.log("This is your last chance!");
        provideHint(guess, randomNumber, difficulty);
    }
    if (guess < randomNumber) {
        console.log("The number is greater than " + guess +". Try again!");
    }
    else if (guess > randomNumber) {
        console.log("The number is less than " + guess + ". Try again!");
    }
}

// Game End Conditions
function checkWinCondition(guess, randomNumber) {
    return guess === randomNumber;
}

// Optional Bonus Features
function playAgain() {
    const choice = prompt("Do you want to play again? (y/n): ").toLowerCase();
    if (choice === 'y') {
        startGame();
    } else if (choice === 'n') {
        console.log("Thanks for playing! Goodbye!");
        process.exit(0);
    } else {
        console.log("Invalid input. Please enter 'y' or 'n'.");
        playAgain();
    }
}

function startTimer() {
    return Date.now();
}
function endTimer(startTime){
     const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`Time taken: ${timeTaken} seconds`);
    return timeTaken;
}

function provideHint(guess, randomNumber, difficulty) {
    const difference = Math.abs(guess - randomNumber);

    if (difficulty === '1') { // Easy: Tam fark
        console.log(`Hint: The number is ${difference} ${guess < randomNumber ? 'greater' : 'less'} than your guess.`);
    }
    else if (difficulty === '2') { // Medium: Sıcak-Soğuk
        if (difference <= 10) console.log("🔥 Boiling hot! Very close!");
        else if (difference <= 20) console.log("♨️ Hot! You're getting closer.");
        else if (difference <= 30) console.log("☀️ Warm. Not too far.");
        else if (difference <= 50) console.log("❄️ Cold. Quite far.");
        else console.log("🧊 Freezing! Way off.");
    }
    else { // Hard: Sadece yön
        console.log(guess < randomNumber ? "Higher!" : "Lower!");
    }
}
function trackHighScore(attempts, timeTaken, difficulty) {
    const highScoreFile = 'highscore.json';
    const defaultScores = {
        Easy: { attempts: Infinity, time: Infinity },
        Medium: { attempts: Infinity, time: Infinity },
        Hard: { attempts: Infinity, time: Infinity }
    };

    try {
        let highScores;
        let isFirstScore = false;

        // Check if file exists
        if (!fs.existsSync(highScoreFile)) {
            // File doesn't exist, create it with default scores
            fs.writeFileSync(highScoreFile, JSON.stringify(defaultScores, null, 2));
            highScores = defaultScores;
            isFirstScore = true;
        } else {
            // File exists, read it
            try {
                highScores = JSON.parse(fs.readFileSync(highScoreFile, 'utf-8'));
                // Validate structure and handle null values
                for (const level of ['Easy', 'Medium', 'Hard']) {
                    if (!highScores[level] ||
                        highScores[level].attempts === null ||
                        highScores[level].time === null) {
                        highScores[level] = { attempts: Infinity, time: Infinity };
                    }
                }
            } catch (e) {
                console.log("High score file corrupted, resetting to defaults...");
                highScores = defaultScores;
                fs.writeFileSync(highScoreFile, JSON.stringify(defaultScores, null, 2));
                isFirstScore = true;
            }
        }

        // Map difficulty to key
        const difficultyKey = ['Easy', 'Medium', 'Hard'][difficulty - 1];
        const currentHighScore = highScores[difficultyKey];

        // Check if current score is better
        if (attempts < currentHighScore.attempts ||
            (attempts === currentHighScore.attempts && timeTaken < currentHighScore.time)) {
            highScores[difficultyKey] = { attempts, time: timeTaken };
            fs.writeFileSync(highScoreFile, JSON.stringify(highScores, null, 2));

            // Only show message if it's not the first score
            if (!isFirstScore) {
                console.log(`🎉 New high score for ${difficultyKey} difficulty: ${attempts} attempts in ${timeTaken.toFixed(2)} seconds!`);
            }
        } else if (!isFirstScore) {
            // Show comparison only if not first score
            const displayTime = currentHighScore.time === Infinity ? 'N/A' : currentHighScore.time.toFixed(2);
            const displayAttempts = currentHighScore.attempts === Infinity ? 'N/A' : currentHighScore.attempts;
            console.log(`High score for ${difficultyKey} difficulty: ${displayAttempts} attempts in ${displayTime} seconds.`);
        }
    } catch (error) {
        console.error("Error tracking high score:", error);
    }
}
// Initialize the Game
startGame();
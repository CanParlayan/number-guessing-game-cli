# Number Guessing Game CLI  

🎮 A fun command-line number guessing game where you try to guess a secret number between 1 and 100!  

🔗 **GitHub Repository**: [https://github.com/CanParlayan/number-guessing-game-cli](https://github.com/CanParlayan/number-guessing-game-cli)  

---

## 🎯 Game Requirements  

A CLI-based game where:  
- The computer randomly selects a number between **1 and 100**.  
- The player selects a **difficulty level** (Easy, Medium, Hard), which determines the number of attempts.  
- The player inputs guesses, and the game provides feedback (higher/lower).  
- The game ends when the player guesses correctly or runs out of attempts.  

### Sample Gameplay  

```
Welcome to the Number Guessing Game!  
I'm thinking of a number between 1 and 100.  
You have 5 chances to guess the correct number.  

Please select the difficulty level:  
1. Easy (10 chances)  
2. Medium (5 chances)  
3. Hard (3 chances)  

Enter your choice: 2  

Great! You have selected the Medium difficulty level.  
Let's start the game!  

Enter your guess: 50  
Incorrect! The number is less than 50.  

Enter your guess: 25  
Incorrect! The number is greater than 25.  

Enter your guess: 35  
Incorrect! The number is less than 35.  

Enter your guess: 30  
Congratulations! You guessed the correct number in 4 attempts.  
```

---

## ✨ How to Run

1. **Requirements:**
   - Make sure Node.js is installed on your system. [Download Node.js](https://nodejs.org/)

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/CanParlayan/number-guessing-game-cli.git
   cd number-guessing-game-cli
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Game:**
   ```bash
   npm start
   ```

5. **Enjoy the Game!**
   - Follow the instructions displayed in the terminal to play the game.
---
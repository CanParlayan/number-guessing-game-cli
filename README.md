# [Number Guessing Game CLI](https://roadmap.sh/projects/number-guessing-game)

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

Please select a difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice (1-3): 3

Great! You have selected the Hard difficulty level.
You have 3 chances to guess the correct number.
Let's start the game!

I'm thinking of a number between 1 and 100.
Enter your guess (1-100): 5
The number is greater than 5. Try again!
You have 2 chances left.

Enter your guess (1-100): 10
This is your last chance!
Lower!
The number is less than 10. Try again!
You have 1 chances left.

Enter your guess (1-100): 8
Time taken: 12.72 seconds
Congratulations! You guessed the correct number in 3 attempts.
High score for Hard difficulty: 2 attempts in 3.13 seconds.
Do you want to play again? (y/n):
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

# Find X Quiz

A simple, interactive web tool that generates random "find x" multiple-choice quizzes. Each question presents an equation with an unknown `x`, and users choose the correct value from four options. The tool uses MathJax to render mathematical expressions beautifully.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/find-x-quiz](https://www.sieu.io.vn/github/find-x-quiz)

## ✨ Features

- **Random Quiz Generation** – Each quiz is dynamically generated with random numbers and operations (`+`, `-`, `*`)
- **Multiple-Choice Questions** – Four answer options are provided for each question, with exactly one correct answer
- **MathJax Rendering** – Mathematical expressions are displayed using MathJax for clear and professional formatting
- **Score Tracking** – Keeps track of the number of correct answers, total questions attempted, and the success rate
- **Instant Feedback** – Users are informed immediately whether their selected answer is correct
- **Next Question Button** – Easily proceed to a new randomly generated question
- **Clean Interface** – Simple, user-friendly design with a clear layout
- **Responsive** – Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- MathJax (for rendering mathematical expressions)

## 📁 Project Structure

```
find-x-quiz/
├── index.html    # Main HTML file
├── style.css     # Stylesheet
├── script.js     # JavaScript quiz generation and logic
└── README.md     # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/find-x-quiz.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd find-x-quiz
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **Start the quiz** – Click the "Bắt đầu" (Start) button to begin
2. **Read the equation** – Each question displays an equation containing `x` (e.g., `2 * x + 3 = 7`)
3. **Choose an answer** – Select one of the four multiple-choice options
4. **Check your answer** – Click the "Kiểm tra" (Check) button to see if you are correct
5. **View your score** – The score display shows:
   - `Số câu đúng` – Number of correct answers
   - `Tổng số câu` – Total number of questions attempted
   - `Tỷ lệ` – Success rate as a percentage
6. **Continue** – Click the "Câu tiếp theo" (Next Question) button to generate a new random question

**How questions are generated:**

The quiz generator:
- Uses a set of positive decimal and fractional values (`0.1`, `0.2`, `0.25`, `0.5`, `1`, `2`)
- Randomly combines two numbers with one of three operations (`+`, `-`, `*`)
- Evaluates the expression to determine the correct value of `x`
- Generates three additional distractors to create four answer options
- Renders the equation and options using MathJax

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.

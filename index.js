require('dotenv').config(); // Load variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// const path = "mongodb://localhost:27017";
// // Connect to MongoDB
// // mongoose.connect('mongodb+srv://shreya152412:shreya2412@cluster0.t51nm8g.mongodb.net/quizdb?retryWrites=true&w=majority&appName=Cluster0', { tlsAllowInvalidCertificates: true});
// mongoose.connect(path);
const mongoURI = process.env.MONGO_URI; // Atlas connection string from env

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));


const ScoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', ScoreSchema);

// Save score
app.post('/api/scores', async (req, res) => {
  const { name, score } = req.body;
  const saved = await Score.create({ name, score });
  res.json(saved);
});

// Get top 5 scores
app.get('/api/scores', async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(5);
  res.json(scores);
});

// Sample question list (you can later move to DB if needed)
const questions = [
 {
  question: "Which keyword is used to define a function in Python?",
  options: ["function", "define", "def", "func"],
  answer: "def"
},
{
  question: "What is the output of: print(type([]))?",
  options: ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
  answer: "<class 'list'>"
},
{
  question: "Which operator is used for exponentiation in Python?",
  options: ["^", "**", "//", "^^"],
  answer: "**"
},
{
  question: "What is the correct way to start a comment in Python?",
  options: ["--", "//", "#", "/*"],
  answer: "#"
},
{
  question: "What is the output of: bool(0)?",
  options: ["True", "False", "0", "None"],
  answer: "False"
},
{
  question: "Which of these is a valid Python data type?",
  options: ["float", "real", "double", "decimal"],
  answer: "float"
},
{
  question: "Which built-in function is used to get the length of a list in Python?",
  options: ["count()", "length()", "len()", "size()"],
  answer: "len()"
},
{
  question: "Which data structure uses key-value pairs?",
  options: ["list", "tuple", "set", "dictionary"],
  answer: "dictionary"
},
{
  question: "What does 'elif' stand for in Python?",
  options: ["else if", "else then", "if else", "if then"],
  answer: "else if"
},
{
  question: "Which function is used to take user input in Python?",
  options: ["get()", "input()", "scan()", "read()"],
  answer: "input()"
},
{
  question: "What will be the output of: len('Hello World')?",
  options: ["10", "11", "12", "None"],
  answer: "11"
},
{
  question: "Which of the following is a mutable data type in Python?",
  options: ["tuple", "string", "list", "int"],
  answer: "list"
},
{
  question: "Which keyword is used to create a loop in Python?",
  options: ["for", "repeat", "foreach", "loop"],
  answer: "for"
},
{
  question: "What will `range(5)` return?",
  options: ["[0, 1, 2, 3, 4, 5]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[1, 2, 3, 4]"],
  answer: "[0, 1, 2, 3, 4]"
},
{
  question: "How do you define a list in Python?",
  options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
  answer: "[1, 2, 3]"
},
{
  question: "Which of the following is used to handle exceptions in Python?",
  options: ["try-except", "catch-throw", "error-handling", "assert-catch"],
  answer: "try-except"
},
{
  question: "What is the output of: type(5.0)?",
  options: ["int", "float", "double", "str"],
  answer: "float"
},
{
  question: "Which keyword is used to define a class in Python?",
  options: ["function", "define", "class", "object"],
  answer: "class"
},
{
  question: "What does the 'pass' statement do in Python?",
  options: ["Terminates a loop", "Skips iteration", "Does nothing", "Raises an error"],
  answer: "Does nothing"
},
{
  question: "Which of the following is NOT a valid Python loop type?",
  options: ["for", "while", "until", "none"],
  answer: "until"
},
{
  question: "What is the output of 'hello'.upper()?",
  options: ["HELLO", "hello", "Hello", "Error"],
  answer: "HELLO"
},
{
  question: "Which keyword is used to create a generator in Python?",
  options: ["yield", "return", "generator", "next"],
  answer: "yield"
},
{
  question: "What will be the output of: bool([])?",
  options: ["True", "False", "None", "Error"],
  answer: "False"
},
{
  question: "Which of these is a correct way to start a function definition?",
  options: ["func myFunc():", "def myFunc():", "function myFunc():", "create myFunc():"],
  answer: "def myFunc():"
},
{
  question: "What is the output of: 3 * 'ab'?",
  options: ["ababab", "ab3", "Error", "ab ab ab"],
  answer: "ababab"
},
{
  question: "Which of the following is a correct way to import the math module?",
  options: ["include math", "use math", "import math", "require math"],
  answer: "import math"
},
{
  question: "How do you check the type of a variable in Python?",
  options: ["typeof()", "type()", "checktype()", "instanceof()"],
  answer: "type()"
},
{
  question: "What will be the output of: '5' + '5'?",
  options: ["10", "55", "'10'", "Error"],
  answer: "55"
},
{
  question: "Which keyword is used to exit a loop early?",
  options: ["exit", "return", "continue", "break"],
  answer: "break"
},
{
  question: "Which operator is used for floor division in Python?",
  options: ["/", "//", "%", "^"],
  answer: "//"
},

  // ... Add all 50 questions here
];

// GET: Send question list
app.get('/api/questions', (req, res) => {
  res.json(questions);
});


// app.listen(3000, () => console.log('Server started on port 3000'));
const PORT = process.env.PORT || 3000; // Use Render-assigned port or 3000 locally

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


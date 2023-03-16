'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});

let authorList = []

function QuestionList() {

    this.getQuestion = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM question WHERE id = ?"
            db.get(sql, [id], (err, row) => {
                if(err)
                    reject(err)
                else
                    resolve(new Question(row.id, row.text, row.author, row.date))
            })
        })
    }

    this.addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO question(id, text, author, date) VALUES(?, ?, ?, ?)"
            db.run(sql, [question.id, question.text, question.author, question.date.toISOString()], (err) => {
                if(err)
                    reject(err)
                else
                    resolve(true)
            })
        })
    }
}

function Answer(id, text, author, score, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.score = score;
    this.date = dayjs(date); 
}

function Question(id, text, author, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM answer WHERE questionId = ?"
            db.all(sql, [this.id], (err, rows) => {
                if(err)
                    reject(err)
                else {
                    const answers = rows.map(row => {
                        new Answer(row.id, row.text, row.author, row.date)
                    })
                    resolve(answers)
                }  
            })
        })
    }
}

const ql = new QuestionList() ;
// ql.getQuestion(1).then(question => {
//     console.log(question)
//     question.getAnswers().then(answers => {
//         console.log(answers)
//     })
// })

ql.getQuestion(2)
    .then(question => question.getAnswers())
    .then(answers => console.log(`We have ${answers.length} answers`))
//ql.addQuestion(new Question(3, "How are you", "Me", "2023-03-14")).then(result =>  {if(result) console.log("Question was added")})

debugger;
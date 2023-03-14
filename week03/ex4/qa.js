'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => { 
    if (err) throw err; 
});

function QuestionList() {
  // TODO implement this function 'QuestionList'
    db.all("SELECT * FROM question", (err, rows) => {
        if (err)
            console.log(err)
        else
            rows.forEach(row => console.log(row))
    });
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
}

const ql = new QuestionList() ;

debugger;
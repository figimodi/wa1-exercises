'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => { 
    if (err) throw err; 
});

let authorList = []

function QuestionList() {
  // TODO implement this function 'QuestionList'
    db.all("SELECT * FROM answer", (err, rows) => {
        if (err)
            throw err
        else {
            authorList = rows.map(item => item['author'])
            //console.log(authorList)
        }
            
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
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


const selectAllTodos = 'SELECT * FROM todos';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Res@Res@Res_123',
  database: 'todos_sql'
})

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());



app.get('/', (req, res) => {
  res.send('Go to /todos to see todos')
});


app.get('/todos', (req, res) => {
  connection.query(selectAllTodos, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  });
});


app.get('/todos/add', (req, res) => {
  const { name } = req.query;
  const insertTodoQuery = `INSERT INTO todos (name) VALUES('${name}')`;
  connection.query(insertTodoQuery, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('Successfully added todo..')
    }
  })
})


app.listen(4000, () => {
  console.log(`TO-DO server listening on port 4000`)
});

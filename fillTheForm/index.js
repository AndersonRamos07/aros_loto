const PORT = 7000;

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


const form = require('./forms/addForm');

server.get('/', (req, res)=>{
  //res.send('Hello World!')
  res.sendFile(__dirname + '/ps/index.html')
})

server.post('/add', (req, res)=>{
  var dados = {
    "lastName": req.body.lastName,
    "firstName": req.body.firstName,
    "email": req.body.email,
    "phone": req.body.phone}
  var resultado = form.add('i-131', dados);

  res.status(200).send('Hello World')

  //res.send('Hello World!')
  //res.sendFile(__dirname + '/ps/index.html')
})

server.listen(PORT, () =>{
  console.log(`Servidor rodando na porta ${PORT}`);
})

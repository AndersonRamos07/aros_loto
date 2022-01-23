const PORT = 7000;

const express = require('express');
const server = express();

server.use(express.static('html'));

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


const form = require('./forms/addForm');

server.get('/', (req, res)=>{ res.sendFile(__dirname + '/ps/index.html')})
server.get('/script.js', (req, res)=>{ res.sendFile(__dirname + '/ps/script.js')})
server.get('/styles.css', (req, res)=>{ res.sendFile(__dirname + '/ps/styles.css')})

server.post('/confirm', (req, res)=>{
  var dados = {
    "lastName": req.body.lastName,
    "firstName": req.body.firstName,
    "email": req.body.email,
    "phone": req.body.phone }
  var resultado = form.add('g-1145', dados);

  res.status(200).send('Hello World')

  //res.send('Hello World!')
  //res.sendFile(__dirname + '/ps/index.html')
})

server.post('/add', (req, res)=>{
  var dados = {
    "lastName": req.body.lastName,
    "firstName": req.body.firstName,
    "email": req.body.email,
    "phone": req.body.phone}
  var resultado = form.add('g-1145', dados);

  console.log(resultado + '<resultado>' + typeof(resultado))

  console.table(resultado)

  res.status(200).send('Hello World')

  res.contentType('application/pdf');
  res.send(resultado)
})

server.post('/acc', async (req, res) =>{
 // var resultado = form.preencherForm();
 // var resultado = form.salvar();
 var resultado = await form.pdfLido();
 console.log(resultado);
  res.redirect('/')
})

server.listen(PORT, () =>{
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})

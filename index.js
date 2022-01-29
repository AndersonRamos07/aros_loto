const PORT = 7000;

const express = require('express');
const server = express();

server.use(express.static('html'));

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//const form = require('./forms/forms.js');
const form = require('./forms/preencheForm');

server.get('/', (req, res)=>{ res.sendFile(__dirname + '/ps/index.html')})
server.get('/script.js', (req, res)=>{ res.sendFile(__dirname + '/ps/script.js')})
server.get('/styles.css', (req, res)=>{ res.sendFile(__dirname + '/ps/styles.css')})

server.post('/confirm', (req, res)=>{
  var dados = {
    "lastName": req.body.lastName,
    "firstName": req.body.firstName,
    "email": req.body.email,
    "phone": req.body.phone }
  var resultado = form.newPage('g-1145', dados);

  res.status(200).send('Hello World')
})

server.post('/add', (req, res)=>{
  console.table(req.body);
  var dados = {
    "lastName": req.body.lastName,
    "firstName": req.body.firstName,
    "email": req.body.email,
    "phone": req.body.phone}
    var quantidade = form.conferirDados(dados);

  res.status(200).write('Dados enviados.');
  res.redirect('/');
})

server.post('/acc', async (req, res) =>{
 // var resultado = form.preencherForm();
 var resultado = form.salvar();
 //var resultado = await form.pdfLido();
 //console.log(resultado);
  //res.redirect('/')
})

server.listen(PORT, () =>{
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
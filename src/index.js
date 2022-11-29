const express = require ('express')
const app = express ()
const bodyParser = require('body-parser')
const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)
require('./api/produto')(app, 'com param!')


app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(saudacao('Junior'))

app.use((req, res, next) =>  {
    console.log('Antes...')
    next()
}) 

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo =  ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
   // let corpo = ''
    //req.on('data', function(parte) {
      //  corpo += parte
    //})

    //req.on('end', function(){
    //})
    res.send(req.body)
})

app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionada!`)
})

app.get('/opa',(req, res, next) => {
    console.log('Durante...')
    res.json ({
        "data": [
            {id: 7, name: 'Ana', position: 1},
            {id: 30, name: 'Bia', position: 2},     
            {id: 37, name: 'Joana', position: 3}
        ]
    })

next()

app.use((req, res) => {
    console.log('Depois...')
})
    //res.json ({
      //  name: 'Ipad 32GB',
        //price: 3099.00,
        discount: 0.12
    //})  
    //res.send("Óla Minha Princesa S2")
})
app.listen (3000, () => {
    console.log('executando beck-end')
})
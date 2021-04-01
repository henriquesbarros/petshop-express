const express = require('express')
const app = express()

app.use(express.json())

const petshop = require('./petshop')

app.get('/pets', (req, res) => {
    return res.send(petshop.listarPets())
})

app.get('/pets/:nome', (req, res) => {
    return res.json(petshop.buscarPet(req.params.nome))
})

app.post('/pets', (req, res) => {
    return res.json(petshop.novoCliente(req.body))
})

app.listen(3000, () => { console.log("Server is running!") })
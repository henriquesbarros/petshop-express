const moment = require('moment');
const fs = require('fs')
const data = require('./data.json');

let pets = data.pets

const petshop = {
    novoCliente: (nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos) => {
        pets.push({
            nome: nome,
            tipo: tipo,
            idade: idade,
            raca: raca,
            peso: peso,
            tutor: tutor,
            contato: contato,
            vacinado: vacinado,
            servicos: servicos
        })
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) throw err;
            console.log('Saved!');
        })

        this.atualizarBanco
    },
    atualizarBanco: () => {
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
    },
    listarPets: () => {
        let textoListaPets = "PETSHOP \n"
     
        pets.forEach(pet => {
            const resultVacina = pet.vacinado ? "Vacinado" : "Não vacinado"
            let { nome, idade, especie, raca } = pet

            textoListaPets += `Nome: ${nome}, Idade: ${idade} anos, Espécie: ${especie}, Raça: ${raca}, Vacina: ${resultVacina} \n`
    
            // pet.servicos.forEach(servico => textoListaPets += `${servico.data} - ${servico.nome} \n`)
        })

        
        return textoListaPets
    },
    darBanhoPet: (pet) => {
        pet.servicos.push({ servico: 'Banho', date: moment().format('MMMM Do YYYY, h:mm:ss a') })
        let { nome } = pet
        console.log(`${nome} está de banho tomado!`)
    },
    tosarPet: (pet) => {
        pet.servicos.push({ servico: 'Tosa', date: moment().format('MMMM Do YYYY, h:mm:ss a') })
        let { nome } = pet
        console.log(`${nome} está com cabelinho na régua!`)
    },
    apararUnhasPet: (pet) => {
        pet.servicos.push({ servico: 'Corte de unhas', date: moment().format('MMMM Do YYYY, h:mm:ss a') })
        let { nome } = pet
        console.log(`${nome} está de unhas aparadas!`)
    },
    vacinarPet: (pet) => {
        if (!pet.vacinado) {
            pet.vacinado = true
            pet.servicos.push({ nome: 'Vacina', data: moment().format('MMMM Do YYYY, h:mm:ss a') })
            let { nome } = pet
            console.log(`${nome} foi vacinado com sucesso!`)
        } else {
            console.log(`Ops, ${nome} já está vacinado!`)
        }
    },
    atenderCliente: (pet, servico) => {
        console.log("Olá, seja bem vindo!")
        servico(pet)
        console.log("Até mais, obrigado pela preferência!")
    },
    campanhaVacina: () => {
        let petsVacinados = 0
    
        pets.map(pet => {
            if (!pet.vacinado) {
                vacinarPet(pet)
                petsVacinados++
            }
        })
    
        console.log(`${petsVacinados} pets foram vacinados nessa campanha!`)
        console.log('')
        atualizarBanco()
    },
    buscarPet: (pet) => {
        const found = pets.find(petAtual => petAtual.nome == pet)
        console.log(found)
    },
    filtrarEspeciePet: (especiePet) => {
        const especiesFiltradas = pets.filter(pet => pet.especie == especiePet)
        console.log(especiesFiltradas)
    },
    clientePremium: (pet) => {
        const contadorServicos = pet.servicos.map(servico => 1)
    
        if (contadorServicos != 0) {
            let numeroDeServicos = contadorServicos.reduce((acumulador, valorAtual) => {
                return acumulador + valorAtual
            })
    
            switch (numeroDeServicos) {
                case 1:
                    console.log(`Você realizou ${numeroDeServicos} serviço(s)!`)
                    console.log("Realize mais um serviço para obter 10% de desconto")
                    break
                case 2:
                    console.log(`Você realizou ${numeroDeServicos} serviço(s)!`)
                    console.log("Parabéns você obteve 10% de desconto!")
                    break
                case 3:
                    console.log(`Você realizou ${numeroDeServicos} serviço(s)!`)
                    console.log("Parabéns, você obteve 20% de desconto!")
                    break
                default:
                    console.log(`Você realizou ${numeroDeServicos} serviço(s)!`)
                    console.log("Parabéns, você obteve 30% de desconto!")
            }
        } else {
            console.log("Gostaria de realizar algum serviço?")
        }
    } 
}

module.exports = petshop
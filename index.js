/************************************************************************************************************************************************
 * Autor: Lohannes da Silva Costa
 * Data: 24/03/2023
 * Versão: 1.1.25.3.23
 * Objetivo: API que retornará os dados necessários para um site da escola Lion School.
 ************************************************************************************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alunosCursos = require('./modulo/app/main.js')

const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    app.use(cors())

    next();
})

//EndPoints

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let statusCode;
    let dadosEstado = {};

    let cursos = alunosCursos.getCursos()

    if (cursos) {
        statusCode = 200
        dadosEstado = cursos
    } else {
        statusCode = 500
    }

    response.status(statusCode)
    response.json(dadosEstado)
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let statusCode;
    let dadosEstado = {};

    let curso = request.query.curso
    let status = request.query.status

    if (curso != undefined) {
        let alunos = alunosCursos.getAlunosDoCurso(curso)

        if (alunos) {
            statusCode = 200
            dadosEstado = alunos
        } else {
            statusCode = 404
        }
    } else if (status != undefined) {
        let alunos = alunosCursos.getAlunosStatus(status)

        if (alunos) {
            statusCode = 200
            dadosEstado = alunos
        } else {
            statusCode = 404
        }
    } else {
        let alunos = alunosCursos.getAlunos()

        if (alunos) {
            statusCode = 200
            dadosEstado = alunos
        } else {
            statusCode = 500
        }
    }

    response.status(statusCode)
    response.json(dadosEstado)
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {
    let statusCode;
    let dadosEstado = {};
    //Recebe a sigla do estado que enviada pela url da requisição.
    let matricula = request.params.matricula

    if (matricula == '' || matricula == undefined || isNaN(matricula)) {
        statusCode = 400
        dadosEstado.message = 'Não foi possível processar pois os dados de entrada (matricula) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, precisam ser Números.'
    } else {
        let aluno = alunosCursos.getAlunoMatricula(matricula)

        //Tratamento para validar o sucesso da requisição
        if (aluno) {
            statusCode = 200
            dadosEstado = aluno
        } else {
            statusCode = 404
        }
    }
    //Retorna o código e o JSON
    response.status(statusCode)
    response.json(dadosEstado)
})

app.listen(8080, function () {
    console.log("Servidor aguardando requisições na porta 8080.");
})
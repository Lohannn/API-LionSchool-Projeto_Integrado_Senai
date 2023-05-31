/************************************************************************************************************************************************
 * Autor: Lohannes da Silva Costa
 * Data: 24/03/2023
 * Versão: 2.0.31.3.23
 * Objetivo: API que retornará os dados necessários para um site da escola Lion School.
 ************************************************************************************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alunosCursos = require('./modulo/app/main.js')

const app = express();

app.use((request, response, next) => {
    //Define se a API será pública ou privada.
    response.header('Access-Control-Allow-Origin', '*')

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    //Envia para o cors() as regras de permissão
    app.use(cors())

    next();
})

//EndPoints

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let statusCode;
    let dadosEstado = {};
    let nome = request.query.nome;
    
    if(nome != undefined){
        let cursos = alunosCursos.getCursosByName(nome)

    if (cursos) {
        statusCode = 200
        dadosEstado = cursos
    } else {
        statusCode = 500
    }
    } else {

    let cursos = alunosCursos.getCursos()

    if (cursos) {
        statusCode = 200
        dadosEstado = cursos
    } else {
        statusCode = 500
    }
    }

    response.status(statusCode)
    response.json(dadosEstado)
    
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let statusCode;
    let dadosEstado = {};

    let nome = request.query.nome
    let curso = request.query.curso
    let status = request.query.status


    if(curso !== undefined && status !== undefined && nome !== undefined){
        if (curso == '' || !isNaN(curso) || status == '' || !isNaN(status) || nome == '' || !isNaN(nome)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (curso, status ou nome) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {
            let alunosStatus = alunosCursos.getAlunosByNameAndCursoAndStatus(alunos, curso, status)

            if (alunosStatus) {
                statusCode = 200
                dadosEstado = alunosStatus
            } else {
                statusCode = 404
            }
        }
    } else if (curso !== undefined && status !== undefined) {

        if (curso == '' || !isNaN(curso) || status == '' || !isNaN(status)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (curso ou status) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {

            let alunos = alunosCursos.getAlunosDoCurso(curso)
            let alunosStatus = alunosCursos.getAlunosDaListaPeloStatus(alunos, status)

            if (alunosStatus) {
                statusCode = 200
                dadosEstado = alunosStatus
            } else {
                statusCode = 404
            }
        }
    } else if (nome !== undefined && status !== undefined) {

        if (nome == '' || !isNaN(nome) || status == '' || !isNaN(status)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (nome ou status) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {

            let alunosStatus = alunosCursos.getAlunosByNameAndStatus(nome, status)

            if (alunosStatus) {
                statusCode = 200
                dadosEstado = alunosStatus
            } else {
                statusCode = 404
            }
        }
    } else if (curso !== undefined && nome !== undefined) {

        if (curso == '' || !isNaN(curso) || nome == '' || !isNaN(nome)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (curso ou nome) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {

            let alunosStatus = alunosCursos.getAlunosByNameAndCurso(nome, curso)

            if (alunosStatus) {
                statusCode = 200
                dadosEstado = alunosStatus
            } else {
                statusCode = 404
            }
        }
    } else if (curso !== undefined) {
        if (curso == '' || !isNaN(curso)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (curso) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {
            let alunos = alunosCursos.getAlunosDoCurso(curso)

            if (alunos) {
                statusCode = 200
                dadosEstado = alunos
            } else {
                statusCode = 404
            }
        }
    } else if (nome !== undefined) {
        if (curso == '' || !isNaN(curso)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (nome) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {
            let alunos = alunosCursos.getAlunosByName(nome)

            if (alunos) {
                statusCode = 200
                dadosEstado = alunos
            } else {
                statusCode = 404
            }
        }
    } else if (status !== undefined) {
        if (status == '' || !isNaN(status)) {
            statusCode = 400
            dadosEstado.message = 'Não foi possível processar pois os dados de entrada (status) que foram enviados não correspondem ao exigido, confira o valor pois não poder ser Vazio, e devem ser apenas letras.'
        } else {
            let alunos = alunosCursos.getAlunosStatus(status)

            if (alunos) {
                statusCode = 200
                dadosEstado = alunos
            } else {
                statusCode = 404
            }
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

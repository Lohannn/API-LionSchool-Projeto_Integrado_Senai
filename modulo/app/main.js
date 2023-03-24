/************************************************************************************************************************************************
 * Autor: Lohannes da Silva Costa
 * Data: 24/03/2023
 * Versão: 1.0.24.3.23
 * Objetivo: Criar funções para alimentar uma API escolar.
 ************************************************************************************************************************************************/

const listaAlunos = require('../json/alunos.js')
const listaCursos = require('../json/cursos.js')

const getCursos = function () {
    let listaCursosJson = false;

    listaCursos.cursos.forEach(function (curso) {
        listaCursosJson = {}

        listaCursosJson.sigla = curso.sigla
        listaCursosJson.icone = curso.icone
    })

    return listaCursosJson
}

const getAlunos = function () {
    let listaAlunosJson = false;
    let listaAlunosArray = []

    listaAlunos.alunos.forEach(function (aluno) {
        let alunosMatriculados = {}

        alunosMatriculados.foto = aluno.foto
        alunosMatriculados.nome = aluno.nome
        alunosMatriculados.matricula = aluno.matricula
        alunosMatriculados.sexo = aluno.sexo
        alunosMatriculados.status = aluno.status

        listaAlunosArray.push(alunosMatriculados)
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }

    return listaAlunosJson
}

const getAlunoMatricula = function (numeroDeMatricula) {
    let matricula = numeroDeMatricula
    let listaAlunosJson = false;

    listaAlunos.alunos.forEach(function (aluno) {
        if (aluno.matricula == matricula) {
            listaAlunosJson = {}
            listaAlunosJson = aluno
        }
    })

    return listaAlunosJson
}

const getAlunosDoCurso = function (siglaDoCurso) {
    let curso = siglaDoCurso.toUpperCase()
    let listaAlunosJson = false;
    let listaAlunosArray = []

    listaAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso_aluno) {
            if (curso_aluno.sigla.toUpperCase() == curso) {
                listaAlunosArray.push(aluno)
            }
        })
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }
    return listaAlunosJson
}

const getAlunosStatus = function (statusDoAluno) {
    let status = statusDoAluno.toUpperCase()
    let listaAlunosJson = false;
    let listaAlunosArray = []

    listaAlunos.alunos.forEach(function (aluno) {
        if (aluno.status.toUpperCase() == status) {
            listaAlunosArray.push(aluno)
        }
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }
    return listaAlunosJson
}

// 20151001001
// 20151001002
// 20151001017
// DS
// RDS

module.exports = {
    getCursos,
    getAlunos,
    getAlunoMatricula,
    getAlunosDoCurso,
    getAlunosStatus
}
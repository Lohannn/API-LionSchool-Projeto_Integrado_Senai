/************************************************************************************************************************************************
 * Autor: Lohannes da Silva Costa
 * Data: 24/03/2023
 * Versão: 2.0.25.3.23
 * Objetivo: Criar funções para alimentar uma API escolar.
 ************************************************************************************************************************************************/

const listaAlunos = require('../json/alunos.js')
const listaCursos = require('../json/cursos.js')

const getCursos = function () {
    let listaCursosJson = false;

    listaCursos.cursos.forEach(function (curso) {
        listaCursosJson = {}

        listaCursosJson.nome = curso.nome
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
        alunosMatriculados.status = aluno.status

        listaAlunosArray.push(alunosMatriculados)
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }

    return listaAlunosJson
}

const getSigla = function (palavraNaoAbreviada) {
    let palavra = palavraNaoAbreviada

    const ignorar = ['de', 'a', 'do', 'da', 'e', 'em', 'para', 'com', 'por', 'sem', 'sob'];
    let palavraDividida = palavra.split(' ')
    let sigla = '';

    if (palavraDividida.length === 1) {
        sigla = palavraDividida[0].slice(0, 2).toUpperCase(); // retorna as duas primeiras letras da palavra em maiúsculas
    } else {
        for (let i = 0; i < palavraDividida.length; i++) {
            let palavra = palavraDividida[i];
            if (!ignorar.includes(palavra)) {
                sigla += palavra.charAt(0);
            }
        }
    }

    return sigla.toUpperCase();
}

const getAlunoMatricula = function (numeroDeMatricula) {
    let matricula = numeroDeMatricula
    let listaAlunosJson = false;

    listaAlunos.alunos.forEach(function (aluno) {
        if (aluno.matricula == matricula) {
            let listaDisciplinasArray = []
            listaAlunosJson = {}

            listaAlunosJson.foto = aluno.foto
            listaAlunosJson.nome = aluno.nome
            listaAlunosJson.matricula = aluno.matricula
            listaAlunosJson.status = aluno.status
            listaAlunosJson.curso = {}

            aluno.curso.forEach(function (curso) {

                listaAlunosJson.curso.nome = curso.nome
                listaAlunosJson.curso.sigla = curso.sigla

                curso.disciplinas.forEach(function (disciplina) {
                    let disciplinaJson = {}

                    disciplinaJson.nome = disciplina.nome
                    disciplinaJson.sigla = getSigla(disciplina.nome)
                    disciplinaJson.media = disciplina.media
                    disciplinaJson.status = disciplina.status

                    listaDisciplinasArray.push(disciplinaJson)
                })

                listaAlunosJson.curso.disciplinas = listaDisciplinasArray
            })
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
                let listaAlunosDoCurso = {}

                listaAlunosDoCurso.foto = aluno.foto
                listaAlunosDoCurso.nome = aluno.nome
                listaAlunosDoCurso.matricula = aluno.matricula
                listaAlunosDoCurso.status = aluno.status

                listaAlunosArray.push(listaAlunosDoCurso)
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
            let listaAlunosDoCurso = {}

            listaAlunosDoCurso.foto = aluno.foto
            listaAlunosDoCurso.nome = aluno.nome
            listaAlunosDoCurso.matricula = aluno.matricula
            listaAlunosDoCurso.status = aluno.status

            listaAlunosArray.push(listaAlunosDoCurso)
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
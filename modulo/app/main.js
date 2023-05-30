/************************************************************************************************************************************************
 * Autor: Lohannes da Silva Costa
 * Data: 24/03/2023
 * Versão: 3.0.31.3.23
 * Objetivo: Criar funções para alimentar uma API escolar.
 ************************************************************************************************************************************************/

const listaAlunos = require('../json/alunos.js')
const listaCursos = require('../json/cursos.js')

const getCursos = function () {
    let listaCursosJson = false;
    let listaCursosArray = []

    listaCursos.cursos.forEach(function (curso) {
        let cursoRegistrado = {}

        cursoRegistrado.nome = curso.nome
        cursoRegistrado.sigla = curso.sigla
        cursoRegistrado.icone = curso.icone
        cursoRegistrado.carga = curso.carga

        listaCursosArray.push(cursoRegistrado)
    })

    if (listaCursosArray.length > 0) {
        listaCursosJson = {}
        listaCursosJson.cursos = listaCursosArray
    }

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
                listaAlunosJson.curso.conclusao = curso.conclusao

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
                listaAlunosDoCurso.curso = {}

                aluno.curso.forEach(function (curso) {
                    listaAlunosDoCurso.curso.nome = curso.nome
                    listaAlunosDoCurso.curso.sigla = curso.sigla
                    listaAlunosDoCurso.curso.conclusao = curso.conclusao
                })

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
            listaAlunosDoCurso.curso = {}

            aluno.curso.forEach(function (curso) {
                listaAlunosDoCurso.curso.nome = curso.nome
                listaAlunosDoCurso.curso.sigla = curso.sigla
                listaAlunosDoCurso.curso.conclusao = curso.conclusao
            })

            listaAlunosArray.push(listaAlunosDoCurso)
        }
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }
    return listaAlunosJson
}

const getAlunosDaListaPeloStatus = function (listaNova, statusDoAluno) {
    let status = statusDoAluno.toUpperCase()
    let alunos = listaNova
    let listaAlunosJson = false;
    let listaAlunosArray = []

    alunos.alunos.forEach(function (aluno) {
        if (aluno.status.toUpperCase() == status) {
            let listaAlunosDoCurso = {}

            listaAlunosDoCurso.foto = aluno.foto
            listaAlunosDoCurso.nome = aluno.nome
            listaAlunosDoCurso.matricula = aluno.matricula
            listaAlunosDoCurso.status = aluno.status
            listaAlunosDoCurso.curso = {}
            listaAlunosDoCurso.curso.nome = aluno.curso.nome
            listaAlunosDoCurso.curso.sigla = aluno.curso.sigla
            listaAlunosDoCurso.curso.conclusao = aluno.curso.conclusao

            listaAlunosArray.push(listaAlunosDoCurso)
        }
    })

    if (listaAlunosArray.length > 0) {
        listaAlunosJson = {}

        listaAlunosJson.alunos = listaAlunosArray
    }
    return listaAlunosJson
}

// console.log(getAlunosDoCurso('RDS').alunos);

module.exports = {
    getCursos,
    getAlunos,
    getAlunoMatricula,
    getAlunosDoCurso,
    getAlunosStatus,
    getAlunosDaListaPeloStatus
}

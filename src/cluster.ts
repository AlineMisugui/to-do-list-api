const os = require('node:os');
const cluster = require('node:cluster');

const primaryProcess = () => { // Função que cria os processos filhos
    const processContent = os.cpus().length; // Pega a quantidade de núcleos do processador
    console.log(`Primary ${process.pid} is running`); // Exibe o PID do processo principal
    console.log(`Forking server with ${processContent} process`); // Exibe a quantidade de processos filhos que serão criados

    for (let index = 0; index < processContent; index++) { // Cria a quantidade de processos filhos de acordo com a quantidade de núcleos do processador
        cluster.fork(); // Cria um processo filho
    } 
}

const workerProcess = async () => { // Função que executa o servidor
    await import('../main'); // Importa o servidor
}

// Ou seja, se o processo é o principal, ele cria os processos filhos, senão, ele executa o servidor
// Isso serve para que o servidor seja executado em paralelo, aproveitando a capacidade do processador de executar várias tarefas ao mesmo tempo
// Isso é útil para servidores que precisam lidar com muitas requisições ao mesmo tempo

cluster.isPrimary ? primaryProcess() : workerProcess();
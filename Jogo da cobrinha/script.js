let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let tempo = 1000; //1 segundo
let cron;
let pontos = 0;

//Inicia o canvas
function criarBG() {
    //Cor do bg
    context.fillStyle = "lightgreen";
    //x, y, altura, largura
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Adicionar um elemento e tirar o último para a cobrinha andar
function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        //Cor
        context.fillStyle = "green";
        //Tamanho
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Cronometro
let hh = 0;
let mm = 0;
let ss = 0;

function start() {
    cron = setInterval(timer(), tempo);
}

function stop() {
    clearInterval(cron);
}

function timer() {
    ss++;

    if (ss == 59) {
        ss = 0;
        mm++;

        if (mm == 59) {
            mm = 0;
            hh++;
        }
    }

    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

    document.getElementById('counter').innerText = format;

    return format;
}

//Evento para movimentação
document.addEventListener('keydown', update);

//Movimentação pelas teclas
function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    //Voltar ao começo da tela e impedir que a cobrinha suma
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //Inicial cronômetro
    start();

    //Condição de fim de jogo
    for(i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            //Parar cronômetro
            stop();
            alert("Game Over =(\n" + pontos + " pontos em " + timer());
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //Posição inicial
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Coordenadas
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //Movimento e crescimento
    if (snakeX != food.x || snakeY != food.y) {
        //Retirar o último elemento para a cobrinha 'andar'
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos += 1;
        document.getElementById('pontuacao').innerHTML = pontos
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Inserir novo elemento para 'andar'
    snake.unshift(newHead);
}

//Atualizar o jogo de tempos em tempos até o jogo acabar
let jogo = setInterval(iniciarJogo, 100);
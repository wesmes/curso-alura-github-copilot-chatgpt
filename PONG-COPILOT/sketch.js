let bolaImagem;
let jogadorImagem;
let computadorImagem;
let fundoImagem;
let quicarSom;
let pontoSom;

let pontosPlayer1 = 0;
let pontosPlayer2 = 0;

function falaPontos(pontosPlayer1, pontosPlayer2) {
    let fala = new SpeechSynthesisUtterance();
    fala.lang = 'pt-BR';
    fala.rate = 1;
    fala.pitch = 1;
    fala.volume = 1;

    if (pontosPlayer1 == 1) {
        fala.text = 'Ponto do jogador 1';
    } else if (pontosPlayer2 == 1) {
        fala.text = 'Ponto do jogador 2';
    } else {
        fala.text = 'Jogador 1 ' + pontosPlayer1 + ' pontos. Jogador 2 ' + pontosPlayer2 + ' pontos.';
    }

    speechSynthesis.speak(fala);
}

// código base do p5.js para o projeto Pong Copilot
// Autor: Weslley Gomes

// Criar classe Raquete com construtor e métodos update e draw
class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.width = 10;
        this.height = 60;
        this.speed = 5;
    }

    update() {
        // Player 1 controls
        if (this.x < width / 2) {
            if (keyIsDown(87)) { // 'W' key to move up
                this.y -= this.speed;
            }
            if (keyIsDown(83)) { // 'S' key to move down
                this.y += this.speed;
            }
        } 
        // Player 2 controls
        else {
            if (keyIsDown(UP_ARROW)) { // Up arrow key to move up
                this.y -= this.speed;
            }
            if (keyIsDown(DOWN_ARROW)) { // Down arrow key to move down
                this.y += this.speed;
            }
        }

        // Prevent the paddle from going off screen
        this.y = constrain(this.y, 0, height - this.height);

        // If the ball hits the paddle, reverse and increase its speed
        if (this.isBallHit()) {
            quicarSom.play();
            bola.vx *= -1.1;
        }
    }

    isBallHit() {
        return bola.x - bola.radius < this.x + this.width &&
               bola.x + bola.radius > this.x &&
               bola.y - bola.radius < this.y + this.height &&
               bola.y + bola.radius > this.y;
    }

    draw() {

        // quando for o jogador 1, desenha a barra do jogador 1
        if (this.x < width / 2) {
            image(jogadorImagem, this.x, this.y, this.width, this.height);
        } else {
            image(computadorImagem, this.x, this.y, this.width, this.height);
        }

    }
}

class Bola {
    constructor() {
        this.radius = 12;
        this.reset();
    }

    // Resets the ball to the center of the screen with a random direction
    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        // current rotatory angle
        this.angle = 0;
    }

    // Updates the ball's position and checks for collisions with the screen edges
    update() {
        this.x += this.vx;
        this.y += this.vy;
        // rotate according to the ball's speed
        this.angle += Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 30;

        // If the ball hits the horizontal edges, reset it
        if (this.x < this.radius || this.x > width - this.radius) {
            if (this.x < this.radius) {
                pontosPlayer2++;
            } else {
                pontosPlayer1++;
            }
            pontoSom.play();
            falaPontos(pontosPlayer1, pontosPlayer2);
            this.reset();
        }

        // If the ball hits the vertical edges, reverse its vertical direction
        if (this.y < this.radius || this.y > height - this.radius) {
            this.vy *= -1;
        }
    }

    // Draws the ball
    draw() {
        // rotate the ball image
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(bolaImagem, 0, 0, 2 * this.radius, 2 * this.radius);
        pop();
    }
}

let bola;
let player1;
let player2;

function preload() {
    bolaImagem = loadImage('Sprites/bola.png');
    jogadorImagem = loadImage('Sprites/barra01.png');
    computadorImagem = loadImage('Sprites/barra02.png');
    fundoImagem = loadImage('Sprites/fundo2.png');
    quicarSom = loadSound('Sons/bounce.wav');
    pontoSom = loadSound('Sons/jingle.wav');
}

// p5.js setup function
function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    player1 = new Raquete(30);
    player2 = new Raquete(width - 40);
}

// p5.js draw function
function draw() {

    // centralized fundoImage, with canvas aspectRatio, and zoom out as maximum as possible
    let canvasAspectRatio = width / height;
    let fundoAspectRatio = fundoImagem.width / fundoImagem.height;
    let scale = 1;
    if (canvasAspectRatio > fundoAspectRatio) {
        scale = width / fundoImagem.width;
    } else {
        scale = height / fundoImagem.height;
    }
    scale = Math.min(scale, 1);
    let scaledWidth = scale * fundoImagem.width;
    let scaledHeight = scale * fundoImagem.height;
    image(fundoImagem, (width - scaledWidth) / 2, (height - scaledHeight) / 2, scaledWidth, scaledHeight);

    [bola, player1, player2].forEach(entity => {
        entity.update();
        entity.draw();
    });
}
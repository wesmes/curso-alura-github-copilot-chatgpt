let bolaImagem;
let jogadorImagem;
let computadorImagem;

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
    }

    // Updates the ball's position and checks for collisions with the screen edges
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // If the ball hits the horizontal edges, reset it
        if (this.x < this.radius || this.x > width - this.radius) {
            this.reset();
        }

        // If the ball hits the vertical edges, reverse its vertical direction
        if (this.y < this.radius || this.y > height - this.radius) {
            this.vy *= -1;
        }
    }

    // Draws the ball
    draw() {
        image(bolaImagem, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
    }
}

let bola;
let player1;
let player2;

function preload() {
    bolaImagem = loadImage('Sprites/bola.png');
    jogadorImagem = loadImage('Sprites/barra01.png');
    computadorImagem = loadImage('Sprites/barra02.png');
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
    background(0);
    [bola, player1, player2].forEach(entity => {
        entity.update();
        entity.draw();
    });
}
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

        // se a raquete for o player 1
        if (this.x < width / 2) {
            // mover raquete para cima
            if (keyIsDown(87)) {
                this.y -= this.speed;
            }

            // mover a esquerda para baixo
            if (keyIsDown(83)) {
                this.y += this.speed;
            }
        } // senão a raquete é o player 2
        else {
            // mover raquete para cima
            if (keyIsDown(UP_ARROW)) {
                this.y -= this.speed;
            }

            // mover a esquerda para baixo
            if (keyIsDown(DOWN_ARROW)) {
                this.y += this.speed;
            }
        }

        // mover raquete para cima
        // if (keyIsDown(UP_ARROW)) {
        //     this.y -= this.speed;
        // }

        // // mover a esquerda para baixo
        // if (keyIsDown(DOWN_ARROW)) {
        //     this.y += this.speed;
        // }

        // limitar a raquete para não sair da tela
        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > height - this.height) {
            this.y = height - this.height;
        }

        // se a bola tocar na raquete, inverte a velocidade
        if (bola.x - bola.radius < this.x + this.width &&
            bola.x + bola.radius > this.x &&
            bola.y - bola.radius < this.y + this.height &&
            bola.y + bola.radius > this.y) {
            bola.vx *= -1;
            bola.vx *= 1.1;
        }
        
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Bola {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = 25;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // se tocar na borda horizontal, reseta no meio da tela
        if (this.x < this.radius || this.x > width - this.radius) {
            this.reset();
        }

        // se tocar na borda vertical, inverte a velocidade
        if (this.y < this.radius || this.y > height - this.radius) {
            this.vy *= -1;
        }
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
    }
}

let bola;
let player1;
let player2;

// função setup do p5.js
function setup() {
    createCanvas(800, 400);
    background(0);
    bola = new Bola();
    player1 = new Raquete(30);
    player2 = new Raquete(width - 30 - 10);
}

// função draw do p5.js
function draw() {
    // desenha um círculo branco
    background(0);
    bola.update();
    bola.draw();
    player1.update();
    player1.draw();    
    player2.update();
    player2.draw();
}
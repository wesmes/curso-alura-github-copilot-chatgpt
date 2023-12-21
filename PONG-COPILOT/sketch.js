// código base do p5.js para o projeto Pong Copilot
// Autor: Weslley Gomes

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

// cria uma nova bola
let bola;

// função setup do p5.js
function setup() {
    createCanvas(800, 400);
    background(0);
    bola = new Bola();
}

// função draw do p5.js
function draw() {
    // desenha um círculo branco
    background(0);
    bola.update();
    bola.draw();
}
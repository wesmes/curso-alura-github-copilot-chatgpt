// código base do p5.js para o projeto Pong Copilot
// Autor: Weslley Gomes

// posição da bola
var x = 200;
var y = 200;

// velocidades da bola aleatórias usando função math.random
var vx = Math.random() * 10 - 5;
var vy = Math.random() * 10 - 5;

// função setup do p5.js
function setup() {
    createCanvas(400, 400);
}

// função draw do p5.js
function draw() {
    // desenha um círculo branco
    background(0);
    fill(255);
    ellipse(x, y, 50, 50);
    x += vx;
    y += vy;

    // se tocar na borda horizontal, inverte a velocidade
    if (y < 25 || y > 375) {
        vy *= -1;
    }

    // se tocar na borda vertical, inverte a velocidade
    if (x < 25 || x > 375) {
        vx *= -1;
    }
}


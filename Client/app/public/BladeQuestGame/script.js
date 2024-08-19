import Player from "./player.js";
import Enemy from "./enemy.js";
import InputHandler from "./input.js";
import { displayCoins } from "./utils.js";


window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    // set up canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');


    const WIDTH = canvas.width = window.innerWidth;
    const HEIGHT = canvas.height = window.innerHeight;


    const input = new InputHandler();
    const player = new Player(WIDTH, HEIGHT);
    //const enemy = new Enemy(WIDTH, HEIGHT);
    const enemies = [];

    function spawnEnemies(){
        if (!player.isDead){
            const direction = Math.random() > 0.5 ? 'left' : 'right';
            const enemy = new Enemy(WIDTH, HEIGHT, direction);
            //enemy.x = -enemy.width - 10;
            enemies.push(enemy);
        }
    }
    function handleDeadEnemies(){
        enemies.forEach((enemy, index) => {
            if (enemy.isDead) enemies.splice(index, 1);
        })
    }

    // spawn enemies every t ms
    const t = 3000
    spawnEnemies();
    setInterval(spawnEnemies, t);
    setInterval(handleDeadEnemies, 2000);


    // background
    const ground = new Image();
    ground.src = './images/backgrounds/ground.png'
    
    
    let lastTime = 0
    // game loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.drawImage(ground, 0, HEIGHT - 90, WIDTH, 90)
        player.draw(ctx, deltaTime);    
        player.update(input, enemies);
        enemies.forEach((enemy) => {
            enemy.draw(ctx, deltaTime);
            enemy.update(deltaTime, player);
            enemy.drawHealthbar(ctx);
        });
        displayCoins(ctx, player);

        requestAnimationFrame(animate);
    };
    animate(0);
})

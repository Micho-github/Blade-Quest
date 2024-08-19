import { enemyStates, RunRight, RunLeft, AttackRight, AttackLeft, IdleRight, IdleLeft, Dead, Emote } from "./enemyStates.js";

const enemyGroan_sound = new Audio('./sfx/zombie_groan.mp3');

export default class Enemy{
    constructor(gameWidth, gameHeight, direction = 'left'){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImage');

        this.direction = direction; // spawn side
        this.states = [new RunRight(this), new RunLeft(this),new AttackRight(this), new AttackLeft(this), new IdleRight(this), new IdleLeft(this), new Dead(this), new Emote(this)];
        this.currentState = this.direction === 'left' ? this.states[0] : this.states[1];

        this.width = this.currentState.width;
        this.height = this.currentState.height;

        this.scale = 2;

        this.x = this.direction === 'left' ? -this.width : this.gameWidth;
        this.y = gameHeight - 100;

        this.frameX = 0;
        this.frameY = this.currentState.frameY;
        this.maxFrame = this.currentState.maxFrame;

        this.fps = 12;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;

        this.isAttacking = false;
        this.cooldownTimer = 0;
        this.attackCooldown = 1000; // in ms

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.isDead = false;
        this.attackDamage = 5;
        this.attackApplied = false
    }

    draw(ctx, deltaTime){
        if (this.frameTimer > this.frameInterval){
            if (this.frameX < this.maxFrame) this.frameX++;
            else if(!this.isDead) this.frameX = 0;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }

        // Determine the Y offset
        let offsetY = 0;
        if (this.currentState.height === 64) {
            offsetY = this.frameY * 64;
        } else if (this.currentState.height === 192) {
        // For 192x192 frames, start after 46 rows of 64x64 frames
        const startRow = 46;
        offsetY = (startRow * 64) + ((this.frameY - startRow) * 192);
        }
        const x = (this.currentState.height === 64) ? this.x : this.x - ((192 - 64)/2) * this.scale;
        const y = (this.currentState.height === 64) ? this.y : this.y - ((192 - 64)/2) * this.scale;
        
        ctx.drawImage(this.image, this.frameX * this.currentState.width, offsetY, this.currentState.width,  this.currentState.height, x, y - 100, this.currentState.width * this.scale, this.currentState.height * this.scale);

        //this.drawHealthbar(ctx);
        
        // display health
      /*   ctx.font = '18px Monospace'
        ctx.fillStyle = 'red'
        ctx.fillText(this.health, this.x + this.width/2 + 10, this.y - this.height - 20);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.strokeText(this.health, this.x + this.width/2 + 10, this.y - this.height - 20); */
    }

    update(deltaTime, player){
        this.currentState.update();
        if (player.isDead) this.setState(enemyStates.EMOTE);
        if (this.isDead) return;
        if (this.cooldownTimer > 0) this.cooldownTimer -= deltaTime;
        else this.cooldownTimer = 0;
        if (this.isAttacking && this.frameX === this.maxFrame) {
            if (!this.attackApplied){
                this.attackPlayer(player);
                this.attackApplied = true;
            }
        }else this.attackApplied = false;
    }

    setState(state){
        if ((state === enemyStates.ATTACK_RIGHT || state === enemyStates.ATTACK_LEFT) && this.cooldownTimer > 0){
            return;
        }
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    takeDamage(damage, player){
        if (this.isDead) return;
        this.health -= damage;
        enemyGroan_sound.play();
        console.log(`Enemy Health: ${this.health}`);
        if (this.health <= 0 && !this.isDead){
            this.isDead = true;
            console.log('Enemy Dead.');
            this.setState(enemyStates.DEAD);

            // Increment player's coins when the enemy dies
            if (player && !player.isDead) {
                player.coins += 5; // Adjust the increment amount if necessary
                //console.log(`Player Coins: ${player.coins}`);
            }
        }
    }

    attackPlayer(player){
        if (!player.isDead){
            console.log("You're hit.");
            player.takeDamage(this.attackDamage);
        }
    }
    drawHealthbar(ctx){
        const barWidth = 50;
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x + this.width/2 + 5, this.y - this.height - 30, barWidth , 10);
        ctx.fillStyle = this.health <= 25 ? 'red' : 'green';
        if (this.health > 0)
            ctx.fillRect(this.x + this.width/2 + 6, this.y - this.height - 29, this.health * barWidth / this.maxHealth - 2, 8);
    }
}
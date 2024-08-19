import {
  playerStates,
  IdleLeft,
  IdleRight,
  AttackLeft,
  AttackRight,
  Crouch,
  Dead,
} from "./playerStates.js";

const groanSound = new Audio("./sfx/groan.mp3");

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("playerImage");

    this.states = [
      new IdleLeft(this),
      new IdleRight(this),
      new AttackLeft(this),
      new AttackRight(this),
      new Crouch(this),
      new Dead(this),
    ];
    this.currentState = this.states[0];

    this.width = this.currentState.width;
    this.height = this.currentState.height;

    this.scale = 2;

    this.x = gameWidth / 2 - this.width / 2;
    this.y = gameHeight - 100;

    this.frameX = 0;
    this.frameY = this.currentState.frameY;
    this.maxFrame = this.currentState.maxFrame;

    this.fps = 24;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.isAttacking = false;
    this.isCrouching = false;
    this.attackApplied = false;
    this.attackDamage = 34;

    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.isDead = false;

    this.lastDirection = "left";

    this.coins = 0;
  }

  draw(ctx, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else if (!this.isDead && !this.isCrouching) this.frameX = 0; // Only reset if not dead or crouching
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    // Determine the Y offset
    let offsetY = 0;
    if (this.currentState.height === 64) {
      offsetY = this.frameY * 64;
    } else if (this.currentState.height === 192) {
      // For 192x192 frames, start after 46 rows of 64x64 frames
      const startRow = 46;
      offsetY = startRow * 64 + (this.frameY - startRow) * 192;
    }
    const x =
      this.currentState.height === 64
        ? this.x
        : this.x - ((192 - 64) / 2) * this.scale;
    const y =
      this.currentState.height === 64
        ? this.y
        : this.y - ((192 - 64) / 2) * this.scale;

    ctx.drawImage(
      this.image,
      this.frameX * this.currentState.width,
      offsetY,
      this.currentState.width,
      this.currentState.height,
      x,
      y - 100,
      this.currentState.width * this.scale,
      this.currentState.height * this.scale
    );

    this.drawHealthbar(ctx);
  }

  update(input, enemies) {
    if (this.isDead) return;
    this.currentState.handleInput(input);
    this.currentState.update();

    if (this.isDead) {
      return; // Stop further updates if the player is dead
    }

    if (this.isAttacking) {
      this.currentState.update();
      // Check if attack should be applied
      enemies.forEach((enemy) => {
        if (this.isEnemyInRange(enemy) && !this.attackApplied) {
          this.attackEnemy(enemy);
          this.attackApplied = true; // Ensure attack is only applied once
        }
      });
    } else {
      this.attackApplied = false; // Reset for the next attack
    }

    // Handle taking damage from enemies
    enemies.forEach((enemy) => {
      if (
        enemy.isAttacking &&
        !enemy.attackApplied &&
        enemy.frameX === enemy.maxFrame
      ) {
        this.takeDamage(enemy.attackDamage);
        enemy.attackApplied = true;
      }
    });
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
    // console.log(this.currentState);
  }

  isEnemyInRange(enemy) {
    // Calculate the absolute difference in x-coordinates
    let deltaX = Math.abs(this.x - enemy.x);

    // Define a maximum attack range (this can be adjusted based on your game's design)
    let maxAttackRange = 150; // Example value

    // Check if the enemy is within the player's attack range and in the direction the player is facing
    if (this.lastDirection === "right") {
      // Player is facing right, so enemy should be to the right of the player
      return deltaX <= maxAttackRange && enemy.x > this.x;
    } else {
      // Player is facing left, so enemy should be to the left of the player
      return deltaX <= maxAttackRange && enemy.x < this.x;
    }
  }

  attackEnemy(enemy) {
    if (!enemy.isDead) {
      console.log("enemy hit.");
      enemy.takeDamage(this.attackDamage, this);
    }
  }

  takeDamage(damage) {
    if (this.isDead) return;
    if (!this.isCrouching) {
      this.health -= damage;
      groanSound.play();
      console.log(`Player Health: ${this.health}`);
    }
    if (this.health <= 0 && !this.isDead) {
      this.isDead = true;
      console.log("Game Over.");
      this.setState(playerStates.DEAD);
    }
  }
  drawHealthbar(ctx) {
    const barWidth = 50;
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.x + this.width / 2 + 5,
      this.y - this.height - 30,
      barWidth,
      10
    );
    if (this.health > 0) ctx.fillStyle = this.health <= 25 ? "red" : "green";
    ctx.fillRect(
      this.x + this.width / 2 + 6,
      this.y - this.height - 29,
      (this.health * barWidth) / this.maxHealth - 2,
      8
    );
    /* ctx.font = '18px Monospace'
            ctx.fillStyle = 'red'
            ctx.fillText(this.health, this.x + this.width/2 + 10, this.y - this.height - 30);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.5;
            ctx.strokeText(this.health, this.x + this.width/2 + 10, this.y - this.height - 30); */
  }
}

export const enemyStates = {
    RUN_RIGHT: 0,
    RUN_LEFT: 1,
    ATTACK_RIGHT: 2,
    ATTACK_LEFT: 3,
    IDLE_RIGHT: 4,
    IDLE_LEFT: 5,
    DEAD: 6,
    EMOTE: 7
};

class EnemyState{
    constructor(state){
        this.state = state;
    }
}

export class RunRight extends EnemyState{
    constructor(enemy){
        super('RUN_RIGHT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 11;
        this.frameX = 0;
        this.maxFrame = 4;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
    }
    update(){
        const offset = 0.05
        if (this.enemy.x < this.enemy.gameWidth/2 - this.enemy.width - (this.enemy.gameWidth * offset)) this.enemy.x++;
        else this.enemy.setState(enemyStates.ATTACK_RIGHT);
    }
}
export class RunLeft extends EnemyState{
    constructor(enemy){
        super('RUN_LEFT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 9;
        this.frameX = 0;
        this.maxFrame = 4;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
    }
    update(){
        if (this.enemy.x > this.enemy.gameWidth/2 + this.enemy.width) this.enemy.x--;
        else this.enemy.setState(enemyStates.ATTACK_LEFT);
    }
}

export class AttackRight extends EnemyState{
    constructor(enemy){
        super('ATTACK_RIGHT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 15;
        this.frameX = 0;
        this.maxFrame = 5;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
        this.enemy.isAttacking = true;
    }
    update(){
        if (this.enemy.frameX >= this.enemy.maxFrame){
            this.isAttacking = false;
            this.enemy.cooldownTimer = this.enemy.attackCooldown;
            this.enemy.setState(enemyStates.IDLE_RIGHT);
        }
    }
}
export class AttackLeft extends EnemyState{
    constructor(enemy){
        super('ATTACK_LEFT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 13;
        this.frameX = 0;
        this.maxFrame = 5;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
        this.enemy.isAttacking = true;
    }
    update(){
        if (this.enemy.frameX >= this.enemy.maxFrame){
            this.isAttacking = false;
            this.enemy.cooldownTimer = this.enemy.attackCooldown;
            this.enemy.setState(enemyStates.IDLE_LEFT);
        }
    }
}
export class IdleRight extends EnemyState{
    constructor(enemy){
        super('IDLE_RIGHT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 11;
        this.frameX = 0;
        this.maxFrame = 0;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
    }
    update(){
        if (this.enemy.cooldownTimer == 0) this.enemy.setState(enemyStates.ATTACK_RIGHT);
    }
}
export class IdleLeft extends EnemyState{
    constructor(enemy){
        super('IDLE_LEFT');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 9;
        this.frameX = 0;
        this.maxFrame = 0;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
    }
    update(){
        if (this.enemy.cooldownTimer == 0) this.enemy.setState(enemyStates.ATTACK_LEFT);
    }
}
export class Dead extends EnemyState{
    constructor(enemy){
        super('DEAD');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 20;
        this.frameX = 0;
        this.maxFrame = 4;
    }
    enter(){
        this.enemy.frameX = this.frameX;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
    }
    update(){
        if (this.enemy.frameX >= this.maxFrame) this.enemy.frameX = this.maxFrame;
    }
}

export class Emote extends EnemyState{
    constructor(enemy){
        super('EMOTE');
        this.enemy = enemy;
        this.width = 64;
        this.height = 64;
        this.frameY = 2;
        this.frameX = 0;
        this.maxFrame = 6;
    }
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = this.frameY;
        this.enemy.maxFrame = this.maxFrame;
        this.enemy.frameTimer = 0;
        this.enemy.isAttacking = false;
    }
    
    update(){

    }
}
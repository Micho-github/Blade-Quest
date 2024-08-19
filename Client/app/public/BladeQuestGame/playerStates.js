import { getClickCoords } from "./utils.js";

const attackSound = new Audio('./sfx/sword_sound.mp3');

export const playerStates = {
    IDLE_LEFT: 0,
    IDLE_RIGHT: 1,
    ATTACK_LEFT: 2,
    ATTACK_RIGHT: 3,
    CROUCH: 4,
    DEAD: 5,
};

class PlayerState{
    constructor(state){
        this.state = state;
    }
}

export class IdleLeft extends PlayerState{
    constructor(player){
        super('IDLE_LEFT');
        this.player = player;
        this.width = 64;
        this.height = 64;
        this.frameY = 9;
        this.frameX = 0;
        this.maxFrame = 0;
    }
    enter(){
        this.player.frameX = this.frameX;
        this.player.frameY = this.frameY;
        this.player.maxFrame = this.maxFrame;
        this.player.isCrouching = false;
    }
    handleInput(input){
        if (input.lastClick === 'mousedown' && !this.player.isAttacking){
            if (getClickCoords(this.player.gameWidth, input) === 'left') this.player.setState(playerStates.ATTACK_LEFT);
            else this.player.setState(playerStates.ATTACK_RIGHT);
        }
        input.lastClick = 'mouseup'; // to avoid repeated attacks when holding the mouse down
        
        if (input.lastKey === 'spacedown') {
            this.player.setState(playerStates.CROUCH);
            this.player.lastDirection = 'left';
        }
    }
    update(){

    }
}
export class IdleRight extends PlayerState{
    constructor(player){
        super('IDLE_RIGHT');
        this.player = player;
        this.width = 64;
        this.height = 64;
    }
    enter(){
        this.player.frameY = 11;
        this.player.frameX = 0;
        this.player.maxFrame = 0;
        this.player.isCrouching = false;
    }
    handleInput(input){
        if (input.lastClick === 'mousedown' && !this.player.isAttacking){
            if (getClickCoords(this.player.gameWidth, input) === 'left') this.player.setState(playerStates.ATTACK_LEFT);
            else this.player.setState(playerStates.ATTACK_RIGHT);
        }

        input.lastClick = 'mouseup'; // to avoid repeated attacks when holding the mouse down

        if (input.lastKey === 'spacedown') {
            this.player.setState(playerStates.CROUCH);
            this.player.lastDirection = 'right';
        }
    }
    update(){

    }
}

export class AttackLeft extends PlayerState{
    constructor(player){
        super('ATTACK_LEFT');
        this.player = player;
        this.width = 192;
        this.height = 192;
        this.frameY = 47;
        this.frameX = 0;
        this.maxFrame = 5;
    }
    enter(){
        attackSound.play();
        this.player.frameX = this.frameX;
        this.player.frameY = this.frameY
        this.player.maxFrame = this.maxFrame;
        this.player.lastDirection = 'left';
        this.player.isAttacking = true;
    }
    handleInput(){
        
    }
    update(){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.setState(playerStates.IDLE_LEFT);
            this.player.isAttacking = false;
        }
    }
}
export class AttackRight extends PlayerState{
    constructor(player){
        super('ATTACK_RIGHT');
        this.player = player;
        this.width = 192;
        this.height = 192;
        this.frameY = 49;
        this.frameX = 0;
        this.maxFrame = 5;
    }
    enter(){
        attackSound.play();
        this.player.frameX = this.frameX;
        this.player.frameY = this.frameY
        this.player.maxFrame = this.maxFrame;
        this.player.lastDirection = 'right';
        this.player.isAttacking = true;
    }
    handleInput(){
        
    }
    update(){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.setState(playerStates.IDLE_RIGHT);
            this.player.isAttacking = false;
        }
    }
}

export class Crouch extends PlayerState{
    constructor(player){
        super('CROUCH');
        this.player = player;
        this.width = 64;
        this.height = 64;
        this.frameY = 20;
        this.frameX = 0;
        this.maxFrame = 3;
    }
    enter(){
        this.player.frameX = this.frameX;
        this.player.frameY = this.frameY;
        this.player.maxFrame = this.maxFrame;
        this.player.isCrouching = true;
    }
    handleInput(input){
        if (input.lastKey === 'spaceup'){
            this.player.setState(this.player.lastDirection === 'left' ? playerStates.IDLE_LEFT : playerStates.IDLE_RIGHT);
            this.isCrouching = false; 
        }
    }
    update(){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.frameX = this.player.maxFrame;
        }
    }
}
export class Dead extends PlayerState{
    constructor(player){
        super('DEAD');
        this.player = player;
        this.width = 64;
        this.height = 64;
        this.frameY = 20;
        this.frameX = 0;
        this.maxFrame = 4;
    }
    enter(){
        this.player.frameX = this.frameX;
        this.player.frameY = this.frameY;
        this.player.maxFrame = this.maxFrame;
    }
    handleInput(){
       
    }
    update() {
        if (this.player.frameX < this.player.maxFrame) {
            this.player.frameX++;
        }
    }
    
}
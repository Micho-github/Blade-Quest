export default class InputHandler{
    constructor(){
        this.lastClick = 'mouseup';
        this.lastKey = '';
        this.clickCoords = {x: 0, y: 0};
        window.addEventListener('mousedown', (e) => {
            this.lastClick = 'mousedown'
            this.clickCoords.x = e.x;
            this.clickCoords.y = e.y;
        });
        window.addEventListener('mouseup', () => {
            this.lastClick = 'mouseup';
        });
        
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ') this.lastKey = 'spacedown';
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === ' ') this.lastKey = 'spaceup';
        });
    }
}
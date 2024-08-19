export default class InputHandler {
  constructor() {
    this.lastClick = "mouseup";
    this.lastKey = "";
    this.clickCoords = { x: 0, y: 0 };

    // Mouse events
    window.addEventListener("mousedown", (e) => {
      this.lastClick = "mousedown";
      this.clickCoords.x = e.x;
      this.clickCoords.y = e.y;
    });

    window.addEventListener("mouseup", () => {
      this.lastClick = "mouseup";
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === " ") this.lastKey = "spacedown";
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === " ") this.lastKey = "spaceup";
    });

    // Touch events
    window.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.lastClick = "mousedown";
        this.clickCoords.x = e.touches[0].clientX;
        this.clickCoords.y = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.lastKey = "spacedown";
      }
    });

    window.addEventListener("touchend", (e) => {
      if (e.touches.length === 0) {
        this.lastClick = "mouseup";
        this.lastKey = "spaceup";
      }
    });

    // Touch-and-hold (long press)
    window.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.touchHoldTimer = setTimeout(() => {
          this.lastKey = "spacedown";
        }, 500); // Adjust the time for long press
      }
    });

    window.addEventListener("touchend", (e) => {
      clearTimeout(this.touchHoldTimer);
      if (this.lastKey === "spacedown") {
        this.lastKey = "spaceup";
      }
    });
  }
}

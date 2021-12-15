class Clock {
    constructor() {
        this.fps = null;
        this.deltaTime = null;
        this.lastTime = null;
        this.callback;
    }

    start() {
        const now = Date.now();
        this.deltaTime = now - this.lastTime;
        this.fps = Math.floor(1000 / deltaTime);
        this.lastTime = now;
    }

    getFps() {
        return this.fps;
    }
    getDeltaTime() {
        return this.deltaTime;
    }
}

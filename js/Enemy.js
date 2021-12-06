class Enemy {
    config = {
        speed: 6,
    };

    props = {
        x: null,
        y: null,
        width: 30,
        height: 30,
        state: [],
    };

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    init() {
        this.props.x = this.random(0, window.innerWidth);
        this.props.y = 0;
    }

    run() {
        context.fillStyle = 'red';
        context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);

        const enemyOutOfMap = this.props.y + this.config.rocketSpeed > window.innerHeight;
        // retire l'element du tableau (missile en dehors de la carte)
        if (enemyOutOfMap) {
            this.props.missiles.splice(index, 1);
        }

        this.props.y += this.config.speed;
    }
}

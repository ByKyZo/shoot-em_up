class Enemy {
    config = {
        speed: 2,
    };

    props = {
        x: null,
        y: null,
        top: null,
        right: null,
        bottom: null,
        left: null,
        width: 50,
        height: 50,
    };

    init() {
        this.props.x = this.random(0, window.innerWidth);
        this.props.y = 0;
    }

    render() {
        this.drawEnemy();
    }

    moveEnemy() {
        this.props.y += this.config.speed;
        this.updateDimension();
    }

    drawEnemy() {
        context.fillStyle = 'red';
        context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
        this.moveEnemy();
    }

    updateDimension() {
        this.props.top = this.props.y;
        this.props.right = this.props.x;
        this.props.bottom = this.props.y + this.props.height;
        this.props.left = this.props.x + this.props.width;
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

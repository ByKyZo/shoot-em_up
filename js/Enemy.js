class Enemy {
    sprite = new Sprite();
    enemySprite = this.sprite.getEnemySpritesheet();

    config = {
        speedMin: 2,
        speedMax: 2.5,
        speed: null,
        height: 50,
        width: 50,
    };

    props = {
        x: null,
        y: null,
        top: null,
        right: null,
        bottom: null,
        left: null,
    };

    constructor() {
        this.props.x = random(0, window.innerWidth);
        this.props.y = 0 - this.config.height;
        this.config.speed = randomDecimal(this.config.speedMin, this.config.speedMax);
    }

    render() {
        this.drawEnemy();
    }

    moveEnemy() {
        this.props.y += this.config.speed;
        this.updateDimension();
    }

    drawEnemy() {
        context.drawImage(
            this.enemySprite.imgElement,
            this.props.x,
            this.props.y,
            this.config.width,
            this.config.height
        );

        // context.fillStyle = 'red';
        // context.fillRect(this.props.x, this.props.y, this.config.width, this.config.height);
        this.moveEnemy();
    }

    updateDimension() {
        this.props.top = this.props.y;
        this.props.right = this.props.x + this.config.width;
        this.props.bottom = this.props.y + this.config.height;
        this.props.left = this.props.x;
    }
}

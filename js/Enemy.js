class Enemy {
    sprite = new Sprite();
    enemySprite = this.sprite.getEnemySpritesheet();

    configuration = {
        vitesseMinimumEnnemis: 2,
        vitesseMaximumEnnemis: 2.5,
        hauteurEnnemis: 50,
        largeurEnnemis: 50,
    };

    props = {
        x: null,
        y: null,
        top: null,
        right: null,
        bottom: null,
        left: null,
        speed: null,
    };

    constructor() {
        this.props.x = random(0, window.innerWidth);
        this.props.y = 0 - this.configuration.hauteurEnnemis;
        this.props.speed = randomDecimal(
            this.configuration.vitesseMinimumEnnemis,
            this.configuration.vitesseMaximumEnnemis
        );
    }

    render() {
        this.drawEnemy();
    }

    moveEnemy() {
        this.props.y += this.props.speed;
        this.updateDimension();
    }

    drawEnemy() {
        context.drawImage(
            this.enemySprite.imgElement,
            this.props.x,
            this.props.y,
            this.configuration.largeurEnnemis,
            this.configuration.hauteurEnnemis
        );

        // context.fillStyle = 'red';
        // context.fillRect(this.props.x, this.props.y, this.configuration.largeurEnnemis, this.configuration.hauteurEnnemis);
        this.moveEnemy();
    }

    updateDimension() {
        this.props.top = this.props.y;
        this.props.right = this.props.x + this.configuration.largeurEnnemis;
        this.props.bottom = this.props.y + this.configuration.hauteurEnnemis;
        this.props.left = this.props.x;
    }
}

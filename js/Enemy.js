class Enemy {
    sprite = new Sprite();
    enemySprite = this.sprite.getEnemySpritesheet();

    constructor() {
        /**
         *
         * La configuration d'un ennemi
         *
         */
        this.configuration = {
            vitesseMinimumEnnemis: 0.09,
            vitesseMaximumEnnemis: 0.13,
            // hauteurEnnemis: 50,
            // largeurEnnemis: 50,
            hauteurEnnemis: 50,
            largeurEnnemis: 50,
        };
        /**
         *
         * Les proprietés d'un ennemi
         *
         */
        this.props = {
            x: randomInt(0, window.innerWidth),
            y: 0 - this.configuration.hauteurEnnemis,
            // mooveHorizontal: false,
            long: 0,
            top: null,
            right: null,
            bottom: null,
            left: null,
            speed: randomFloat(
                this.configuration.vitesseMinimumEnnemis,
                this.configuration.vitesseMaximumEnnemis
            ),
        };
    }

    render() {
        this.drawEnemy();
    }

    moveEnemy() {
        this.props.y += this.props.speed * deltaTime;

        // this.props.long += this.props.speed * deltaTime;
        // const cos = Math.cos(this.props.long * 0.01) * 0.8;
        // this.props.x += cos;

        // const sin = Math.cos(this.props.long * 0.01) * 0.8;

        // this.props.y += this.props.speed * deltaTime + sin;

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

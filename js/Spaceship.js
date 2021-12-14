class Spaceship {
    sprite = new Sprite();
    /**
     *
     * La configuration du jeu
     *
     */
    configuration = {
        vitesseVaisseau: 6,
        vitesseMissile: 12,
        tempsDeRechargementEntreLesTirs: 100,
        debug: false,
        largeurDesMissiles: 12,
        hauteurDesMissiles: 24,
    };
    /**
     *
     * Les propriétes du vaisseau
     *
     */
    props = {
        x: null,
        y: null,
        top: null,
        right: null,
        bottom: null,
        left: null,
        width: 100,
        height: 100,
        missiles: [],
        currentFireCooldown: 0,
    };
    /**
     *
     * Les états du vaisseau
     *
     */
    state = {
        isFireCooldownEnd: true,
        isFire: false,
        isMoveTop: false,
        isMoveRight: false,
        isMoveBottom: false,
        isMoveLeft: false,
    };

    constructor(x, y) {
        this.props.x = x;
        this.props.y = y;
    }
    /**
     *
     * Initialisation du vaisseau
     *
     */
    init() {
        this.handleListener();
    }
    /**
     *
     * Permet de faire fonctionner le vaisseau
     * - Crée le vaisseau
     * - Crée les missiles
     * - Gere les differents etats (avancer : en haut / a droite / en bas / a gauche , et le tire) du vaisseau en fonction des touches préssées
     *
     */
    render() {
        this.handleCommand();
        this.drawSpaceship();
    }

    handleCommand() {
        const checkCollisionTopY = this.props.y - this.configuration.vitesseVaisseau > 0;
        const checkCollisionRightX =
            this.props.x + this.configuration.vitesseVaisseau + this.props.width <
            window.innerWidth;
        const checkCollisionBottomY =
            this.props.y + this.configuration.vitesseVaisseau + this.props.height <
            window.innerHeight;
        const checkCollisionLeftX = this.props.x - this.configuration.vitesseVaisseau > 0;

        if (this.state.isMoveTop && checkCollisionTopY) {
            this.props.y -= this.configuration.vitesseVaisseau;
        }
        if (this.state.isMoveRight && checkCollisionRightX) {
            this.props.x += this.configuration.vitesseVaisseau;
        }
        if (this.state.isMoveBottom && checkCollisionBottomY) {
            this.props.y += this.configuration.vitesseVaisseau;
        }
        if (this.state.isMoveLeft && checkCollisionLeftX) {
            this.props.x -= this.configuration.vitesseVaisseau;
        }
        if (this.state.isFire) {
            this.makeMissile();
        }
        this.updateDimension();
    }

    handleListener() {
        // todo : remove les events
        const handleState = (e) => {
            const value = e.type === 'keydown';
            if (e.key === 'ArrowUp') {
                this.state.isMoveTop = value;
            }
            if (e.key === 'ArrowRight') {
                this.state.isMoveRight = value;
            }
            if (e.key === 'ArrowDown') {
                this.state.isMoveBottom = value;
            }
            if (e.key === 'ArrowLeft') {
                this.state.isMoveLeft = value;
            }
            if (e.key === ' ') {
                this.state.isFire = value;
            }
        };
        window.addEventListener('keydown', handleState);
        window.addEventListener('keyup', handleState);
    }

    updateDimension() {
        this.props.top = this.props.y;
        this.props.right = this.props.x + this.props.width;
        this.props.bottom = this.props.y + this.props.height;
        this.props.left = this.props.x;
    }

    updateMissileDimension(i) {
        this.props.missiles[i].top = this.props.missiles[i].y;
        this.props.missiles[i].right = this.props.missiles[i].x + this.props.missiles[i].width;
        this.props.missiles[i].bottom = this.props.missiles[i].y + this.props.missiles[i].height;
        this.props.missiles[i].left = this.props.missiles[i].x;
    }

    drawSpaceship(callback) {
        // TODO : A factoriser
        const spaceshipSprite = this.sprite.getSpaceshipSprite();

        context.drawImage(
            spaceshipSprite.imgElement,
            this.props.x,
            this.props.y,
            this.props.width,
            this.props.height
            // spaceshipSprite.width(),
            // spaceshipSprite.height()
        );

        if (this.configuration.debug) {
            context.fillStyle = '#00ff0050';
            context.fillRect(
                this.props.x + this.props.width / 2 - this.configuration.largeurDesMissiles / 2,
                this.props.y - window.innerHeight,
                this.configuration.largeurDesMissiles,
                window.innerHeight
            );
        }
    }

    setMissileCooldown() {
        if (!this.state.isFireCooldownEnd) {
            setTimeout(() => {
                this.state.isFireCooldownEnd = true;
            }, this.configuration.tempsDeRechargementEntreLesTirs);
        }
    }

    makeMissile() {
        if (this.state.isFireCooldownEnd) {
            const missileX =
                this.props.x + this.props.width / 2 - this.configuration.largeurDesMissiles / 2;
            const missileY = this.props.y - this.configuration.hauteurDesMissiles;

            this.props.missiles.push({
                x: missileX,
                y: missileY,
                width: this.configuration.largeurDesMissiles,
                height: this.configuration.hauteurDesMissiles,
                top: missileY,
                right: missileX + this.configuration.largeurDesMissiles,
                bottom: missileY + this.configuration.hauteurDesMissiles,
                left: missileX,
            });

            this.state.isFireCooldownEnd = false;
            this.setMissileCooldown();
        }
    }

    moveMissile(i) {
        if (!this.props.missiles[i]) return;

        const missileOutOfMap = this.props.missiles[i].y + this.props.missiles[i].height < 0;

        if (missileOutOfMap) {
            this.destroyMissile(i);
        } else {
            this.props.missiles[i].y -= this.configuration.vitesseMissile;
            this.updateMissileDimension(i);
        }
    }

    drawMissile(callback) {
        for (let i = 0; i < this.props.missiles.length; i++) {
            if (!this.props.missiles[i]) {
                continue;
            }

            const missileSprite = this.sprite.getMissileSpritesheet();

            context.drawImage(
                missileSprite.imgElement,
                this.props.missiles[i].x,
                this.props.missiles[i].y,
                this.configuration.largeurDesMissiles,
                this.configuration.hauteurDesMissiles
            );

            this.moveMissile(i);
            callback(this.props.missiles[i], i);
        }

        console.log('missile count : ', this.props.missiles.length);
    }

    destroyMissile(missileIndex) {
        this.props.missiles.splice(missileIndex, 1);
    }
}

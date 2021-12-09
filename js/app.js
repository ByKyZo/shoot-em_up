const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// TODO : Gérer le delta time
// TODO : Faire une class qui gere le spawn des ennemies
// TODO : Faire une class qui gere les collisions (pour les missiles bonus etc...)
// TODO : Régler le bug des enemies qui clignonent (hint : quand les enemies sortent de la map -> renderEnemies())

class Main {
    config = {
        enemy: {
            min: 3,
            max: 8,
            intervalMin: 300,
            intervalMax: 800,
        },
        godmode: false,
    };

    isStart = false;
    score = 0;
    enemies = [];
    enemyCooldownEnd = true;
    spaceship = new Spaceship();

    render() {
        this.spaceship.render();
        this.spaceship.drawMissile(this.checkMissileCollideOnEnemy.bind(this));
        this.checkSpaceshipCollideOnEnemy();
        this.makeEnemies();
        this.renderEnemies();
    }

    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.spaceship.init();
    }

    checkMissileCollideOnEnemy(missile, missileIndex) {
        if (this.spaceship.props.missiles.length === 0) return;

        this.enemies.forEach((enemy, enemyIndex) => {
            if (checkCollision(missile, enemy.props)) {
                this.destroyEnemy(enemyIndex);
                this.spaceship.destroyMissile(missileIndex);
                this.score++;
                console.log('score : ', this.score);
            }
        });
    }

    checkSpaceshipCollideOnEnemy() {
        if (this.config.godmode) return;
        this.enemies.forEach((enemy, index) => {
            if (checkCollision(this.spaceship.props, enemy.props)) {
                this.isStart = false;
                console.log('Dead');
            }
        });
    }

    makeEnemies() {
        if (!this.enemyCooldownEnd) return;
        const enemyCount = random(this.config.enemy.min, this.config.enemy.max);
        for (let i = 0; i < enemyCount; i++) {
            const enemy = new Enemy();
            enemy.init();
            this.enemies.push(enemy);
        }
        this.enemyCooldownEnd = false;
        this.setEnemyCooldown();
    }

    setEnemyCooldown() {
        const randomEnemyTimeout = random(
            this.config.enemy.intervalMin,
            this.config.enemy.intervalMax
        );
        setTimeout(() => {
            this.enemyCooldownEnd = true;
        }, randomEnemyTimeout);
    }

    renderEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i]) {
                continue;
            }
            this.enemies[i].render();
            const enemyOutOfMap = this.enemies[i].props.y > window.innerHeight;
            if (enemyOutOfMap) {
                this.destroyEnemy(i);
            }
        }
    }

    destroyEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }
}

const main = new Main();
main.init();

const sprite = new Sprite();
const background = sprite.getStars();

const tick = () => {
    requestAnimationFrame(tick);
    if (main.isStart) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        context.drawImage(
            background.imgElement,
            0,
            0,
            background.width() * 20,
            background.height() * 20
        );
        // context.drawImage(background.imgElement, 0, 0, window.innerWidth, window.innerHeight);
        main.render();
    } else {
        console.log('end');
    }
};

tick();

// Ajustement de la taille du canvas en fonction de la taille de la fenetre
const handleResize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
};
handleResize();
window.addEventListener('resize', handleResize);

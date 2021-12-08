const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

class Main {
    config = {
        enemy: {
            min: 6,
            max: 12,
            intervalMin: 300,
            intervalMax: 800,
        },
    };

    isStart = true;
    score = 0;
    enemies = [];
    enemyCooldownEnd = true;
    GOD_MODE = false;
    spaceship = new Spaceship();

    render() {
        this.spaceship.render();
        this.spaceship.drawMissile(this.checkMissileCollideOnEnemy.bind(this));
        this.checkSpaceshipCollideOnEnemy();
        this.initEnemies();
        this.renderEnemies();
    }

    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.spaceship.init();
        // this.initEnemies();
    }

    checkMissileCollideOnEnemy(missile, missileIndex) {
        if (this.spaceship.props.missiles.length === 0) return;

        this.enemies.forEach((enemy, enemyIndex) => {
            if (
                missile.top < enemy.props.bottom &&
                missile.right < enemy.props.left &&
                missile.bottom > enemy.props.top &&
                missile.left > enemy.props.right
            ) {
                this.destroyEnemy(enemyIndex);
                this.spaceship.destroyMissile(missileIndex);
                this.score++;
                console.log('score : ', this.score);
            }
        });
    }

    checkSpaceshipCollideOnEnemy() {
        if (this.GOD_MODE) return;
        this.enemies.forEach((enemy, index) => {
            if (
                this.spaceship.props.top < enemy.props.bottom &&
                this.spaceship.props.right < enemy.props.left &&
                this.spaceship.props.bottom > enemy.props.top &&
                this.spaceship.props.left > enemy.props.right
            ) {
                this.isStart = false;
                console.log('Dead');
            }
        });
    }

    initEnemies() {
        if (!this.enemyCooldownEnd) return;
        const enemyCount = random(this.config.enemy.min, this.config.enemy.max);
        console.log('enemyCount :', enemyCount);
        for (let i = 0; i < enemyCount; i++) {
            const enemy = new Enemy();
            enemy.init();
            this.enemies.push(enemy);
        }
        this.enemyCooldownEnd = false;
        this.setEnemyCooldown();
    }

    setEnemyCooldown() {
        const enemyInterval = random(this.config.enemy.intervalMin, this.config.enemy.intervalMax);
        setTimeout(() => {
            this.enemyCooldownEnd = true;
        }, enemyInterval);
    }

    renderEnemies() {
        const enemiesOutOfMapIndex = [];

        this.enemies.forEach((enemy, index) => {
            enemy.render();
            const enemyOutOfMap = enemy.props.y - 200 > window.innerHeight;
            if (enemyOutOfMap) {
                enemiesOutOfMapIndex.push(index);
            }
        });

        enemiesOutOfMapIndex.forEach((index) => {
            this.enemies.splice(index, 1);
        });
    }

    destroyEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }
}

const shipSpritesheet = document.querySelector('#ship-spritesheet');
shipSpritesheet.remove();
// console.log(shipSpritesheet);
// requestAnimationFrame(() => {
//     context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     // context.fillStyle = 'blue';
//     // context.fillRect(100, 100, 100, 100);
//     const innerXpos = 2;
//     const innerYpos = 0;
//     const innerWidth = 12;
//     const innerHeight = 24;
//     const posX = 0;
//     const posY = 0;
//     // const width = innerWidth * 10;
//     // const height = innerHeight * 10;
//     const width = innerWidth;
//     const height = innerHeight;
//     // context.drawImage(shipSpritesheet, 2, 0, 12, 24, 0, 0, 12 * 2, 24 * 2);
//     context.drawImage(
//         shipSpritesheet,
//         innerXpos,
//         innerYpos,
//         innerWidth,
//         innerHeight,
//         posX,
//         posX,
//         width,
//         height
//     );
// });

const main = new Main();
main.init();

const tick = () => {
    requestAnimationFrame(tick);
    if (main.isStart) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
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

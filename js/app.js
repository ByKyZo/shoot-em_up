const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

class Main {
    isStart = true;
    score = 0;
    enemies = [];
    spaceship = new Spaceship();

    render() {
        this.spaceship.render();
        this.renderEnemies();
        this.checkMissileCollideOnEnemy();
        this.checkSpaceshipCollideOnEnemy();
    }

    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.spaceship.init();
        this.initEnemies();
    }

    checkMissileCollideOnEnemy() {
        if (this.spaceship.props.missiles.length === 0) return;

        this.spaceship.drawMissile((missile, missileIndex) => {
            // Gere la collision du missile avec les enemies
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
        });
    }

    checkSpaceshipCollideOnEnemy() {
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
        setInterval(() => {
            const enemy = new Enemy();
            enemy.init();
            this.enemies.push(enemy);
        }, 500);
    }

    renderEnemies() {
        const enemiesOutOfMapIndex = [];

        this.enemies.forEach((enemy, index) => {
            enemy.render();
            const enemyOutOfMap = enemy.props.y > window.innerHeight;
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

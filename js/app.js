const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

class Main {
    enemies = [];
    spaceship = new Spaceship();

    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.spaceship.init();
        this.initEnemies();
    }

    initEnemies() {
        setInterval(() => {
            const enemy = new Enemy();
            enemy.init();
            this.enemies.push(enemy);
        }, 500);
    }

    checkMissileCollideOnEnemy() {
        if (this.spaceship.props.missiles.length === 0) return;

        const enemiesKilledIndexes = [];

        this.enemies.forEach((enemy, index) => {
            this.spaceship.props.missiles.forEach((missile) => {
                // TODO Check pourquoi les dimensions (top/right/bottom/left)
                if (
                    missile.x < enemy.props.x + enemy.props.width &&
                    missile.x + missile.width > enemy.props.x &&
                    missile.y < enemy.props.y + enemy.props.height &&
                    missile.height + missile.y > enemy.props.y
                ) {
                    enemiesKilledIndexes.push(index);
                    console.log('hit');
                }

                // TODO ça fonctionne mais bizarre
                // if (
                //     missile.top < enemy.props.bottom &&
                //     missile.left > enemy.props.right &&
                //     missile.bottom > enemy.props.top &&
                //     missile.right < enemy.props.left
                // ) {
                //     enemiesKilledIndexes.push(index);
                //     console.log('hit');
                // }
            });
        });

        enemiesKilledIndexes.forEach((index) => {
            this.enemies.splice(index, 1);
        });
    }

    runEnemies() {
        const enemiesOutOfMapIndex = [];

        this.enemies.forEach((enemy, index) => {
            const enemyOutOfMap = enemy.props.y - enemy.props.height > window.innerHeight;
            enemy.run();
            if (enemyOutOfMap) {
                enemiesOutOfMapIndex.push(index);
            }
        });

        enemiesOutOfMapIndex.forEach((index) => {
            this.enemies.splice(index, 1);
        });
    }

    run() {
        this.spaceship.run();
        this.runEnemies();
        this.checkMissileCollideOnEnemy();
    }
}

const main = new Main();
main.init();

const tick = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    main.run();
    requestAnimationFrame(tick);
};

tick();

// Ajustement de la taille du canvas en fonction de la taille de la fenetre
const handleResize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
};
handleResize();
window.addEventListener('resize', handleResize);

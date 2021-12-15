class EnemySpawner {
    spaceship = new Spaceship();
    enemies = [];
    config = {
        enemy: {
            min: 3,
            max: 10,
            intervalMin: 500,
            intervalMax: 800,
        },
    };
    props = {
        enemyCooldownEnd: true,
    };

    constructor(spaceship) {
        this.spaceship = spaceship;
    }

    // Todo : rajouter la callback : pour incrementer le score
    checkMissileCollideOnEnemy(missile, missileIndex, onMissileCollideCallback) {
        if (this.spaceship.props.missiles.length === 0) return;

        this.enemies.forEach((enemy, enemyIndex) => {
            if (checkCollision(missile, enemy.props)) {
                this.destroyEnemy(enemyIndex);
                this.spaceship.destroyMissile(missileIndex);

                onMissileCollideCallback();
            }
        });
    }

    // Todo : rajouter la callback : mettre fin au jeu
    checkSpaceshipCollideOnEnemy(onSpaceshipCollideCallback) {
        if (this.config.godmode) return;
        this.enemies.forEach((enemy, index) => {
            if (checkCollision(this.spaceship.props, enemy.props)) {
                onSpaceshipCollideCallback();
                this.isStart = false;
                console.log('Dead');
            }
        });
    }

    makeEnemies() {
        if (!this.props.enemyCooldownEnd) return;
        const enemyCount = random(this.config.enemy.min, this.config.enemy.max);
        for (let i = 0; i < enemyCount; i++) {
            this.enemies.push(new Enemy());
        }
        this.props.enemyCooldownEnd = false;
        this.setEnemyCooldown();
    }

    setEnemyCooldown() {
        const randomEnemyTimeout = random(
            this.config.enemy.intervalMin,
            this.config.enemy.intervalMax
        );
        setTimeout(() => {
            this.props.enemyCooldownEnd = true;
        }, randomEnemyTimeout);
    }

    drawEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i]) {
                continue;
            }
            // Quand l'ennemi sort de la map
            if (this.enemies[i].props.y > window.innerHeight) {
                this.destroyEnemy(i);
            }
            this.enemies[i].render();
        }
    }

    renderEnemies() {
        this.makeEnemies();
        this.drawEnemies();
    }

    destroyEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }
}

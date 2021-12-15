class EnemySpawner {
    /**
     *
     * @param {Spaceship} spaceship
     *
     */
    constructor(spaceship) {
        /**
         *
         * La configuration de l'apparation des ennemies
         *
         */
        this.configuration = {
            nombreApparitionEnnemisMinimum: 4,
            nombreApparitionEnnemisMaximum: 8,
            // nombreApparitionEnnemisMinimum: 300,
            // nombreApparitionEnnemisMaximum: 400,
            intervalleApparitionMinimum: 800,
            intervalleApparitionMaximum: 1000,
        };
        /**
         *
         * Les propriétés de l'apparation des ennemies
         *
         */
        this.props = {
            enemyCooldownEnd: true,
            enemies: [],
        };
        this.spaceship = spaceship;
    }
    /**
     *
     * Verifie la collision entre un missile et un ennemi
     * @param {MissileObject} missile
     * @param {Number} missileIndex
     * @param {() => void} onMissileCollideCallback
     * @returns void
     * la fonction de callback sert notamment a incrementer le score dans la class Main
     *
     */
    checkMissileCollideOnEnemy(missile, missileIndex, onMissileCollideCallback) {
        if (this.spaceship.props.missiles.length === 0) return;

        this.props.enemies.forEach((enemy, enemyIndex) => {
            if (checkCollision(missile, enemy.props)) {
                this.destroyEnemy(enemyIndex);
                this.spaceship.destroyMissile(missileIndex);

                onMissileCollideCallback();
            }
        });
    }
    /**
     *
     * Verifie la collision entre un enemi et le vaisseau
     * @param {() => void)} onSpaceshipCollideCallback
     * @returns void
     *
     */
    // Todo : rajouter la callback : mettre fin au jeu
    checkSpaceshipCollideOnEnemy(onSpaceshipCollideCallback) {
        this.props.enemies.forEach((enemy, index) => {
            if (checkCollision(this.spaceship.props, enemy.props)) {
                onSpaceshipCollideCallback();
                console.log('Dead');
            }
        });
    }
    /**
     *
     * Genere un nombre d'ennemies aleatoire en fonction de la configuration
     * Et les pousses dans le tableaux ensuite on attends que le cooldown d'apparation se finisse pour lancer la prochaine apparition
     * @returns void
     *
     */
    makeEnemies() {
        if (!this.props.enemyCooldownEnd) return;
        const enemyCount = randomInt(
            this.configuration.nombreApparitionEnnemisMinimum,
            this.configuration.nombreApparitionEnnemisMaximum
        );
        for (let i = 0; i < enemyCount; i++) {
            this.props.enemies.push(new Enemy());
        }
        this.props.enemyCooldownEnd = false;
        this.setEnemyCooldown();
    }
    /**
     *
     * Mets a jour l'interval de temps d'apparation des ennemies en fonction de la configuration
     * @returns void
     *
     */
    setEnemyCooldown() {
        const randomEnemyTimeout = randomInt(
            this.configuration.intervalleApparitionMinimum,
            this.configuration.intervalleApparitionMaximum
        );
        setTimeout(() => {
            this.props.enemyCooldownEnd = true;
        }, randomEnemyTimeout);
    }
    /**
     *
     * Dessine l'enemi sur le canvas
     * @returns void
     *
     */
    drawEnemies() {
        for (let i = 0; i < this.props.enemies.length; i++) {
            if (!this.props.enemies[i]) {
                continue;
            }
            // Quand l'ennemi sort de la map
            if (this.props.enemies[i].props.y > window.innerHeight) {
                this.destroyEnemy(i);
            }
            this.props.enemies[i].render();
        }
        // console.log(this.props.enemies.length);
    }
    /**
     *
     * Genere les ennemies puis les dessines
     * @returns void
     *
     */
    renderEnemies() {
        this.makeEnemies();
        this.drawEnemies();
    }
    /**
     * Detruit un ennemi / l'enleve du tableau
     * @returns void
     *
     */
    destroyEnemy(enemyIndex) {
        this.props.enemies.splice(enemyIndex, 1);
    }
    /**
     *
     * Reset le spawner
     *
     */
    reset() {
        this.props.enemies = [];
    }
}

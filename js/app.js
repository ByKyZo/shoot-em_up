const canvas = document.querySelector('canvas');
const home = document.querySelector('#home');
const gameover = document.querySelector('#gameover');
const context = canvas.getContext('2d');
const scoreLayout = document.querySelector('#score-layout');
const currentScore = document.querySelector('#current-score');
const finalScore = document.querySelector('#final-score');
const fps = document.querySelector('#fps');
const btnPlay = document.querySelector('#play');
const btnRestart = document.querySelector('#restart');
const btnQuit = document.querySelector('#quit');
context.imageSmoothingEnabled = false;

let deltaTime = null;
let currentFps = null;

// TODO : Faire bouger les ennemies de droite a gauche
// TODO : Mettre la width / height dans config

class Main {
    constructor() {
        /**
         *
         * Configuration du jeu
         *
         */
        this.configuration = {
            modeInvincible: false,
        };
        /**
         *
         * Propriété du jeu
         *
         */
        this.isStart = false;
        this.score = 0;
        this.spaceship = new Spaceship();
        this.enemySpawner = new EnemySpawner();
    }
    /**
     *
     * Initialise le jeu
     *  - Initialise le vaisseau
     *  - Initialise l'apparation des ennemies
     *
     */
    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.enemySpawner = new EnemySpawner(this.spaceship);
        this.spaceship.init();
    }
    /**
     *
     * Fait le rendu du jeu
     *  - Dessine les missiles et les enemies
     *  - Dans les fonctions de callback on verifie les collisions (optimisations des boucles)
     *
     */
    render() {
        this.spaceship.render();

        this.spaceship.drawMissile((missile, missileIndex) =>
            this.enemySpawner.checkMissileCollideOnEnemy(missile, missileIndex, () => {
                this.incScore();
            })
        );

        if (!this.configuration.modeInvincible) {
            this.enemySpawner.checkSpaceshipCollideOnEnemy(() => {
                this.isStart = false;
                console.log('end');
            });
        }

        this.enemySpawner.renderEnemies();
    }
    /**
     *
     * Incremente le score
     *
     */
    incScore() {
        this.score++;
        currentScore.innerHTML = this.score;
        finalScore.innerHTML = this.score;
    }
    /**
     *
     *  Reset
     *
     */
    reset() {
        this.score = 0;
        currentScore.innerHTML = this.score;
        finalScore.innerHTML = this.score;
        this.spaceship.reset();
        this.enemySpawner.reset();
    }
}

const main = new Main();
main.init();

const sprite = new Sprite();
const background = sprite.getBackground();

const showHomePage = () => {
    scoreLayout.style.display = 'none';
    canvas.style.display = 'none';
    home.style.display = 'flex';
    gameover.style.display = 'none';
};
const showGameoverPage = () => {
    scoreLayout.style.display = 'none';
    canvas.style.display = 'flex';
    home.style.display = 'none';
    gameover.style.display = 'flex';
};
const showGamePage = () => {
    scoreLayout.style.display = 'flex';
    canvas.style.display = 'flex';
    home.style.display = 'none';
    gameover.style.display = 'none';
};

showHomePage();

let isFirstGame = true;

btnPlay.addEventListener('click', () => {
    console.log('play');
    showGamePage();
    main.isStart = true;
    isFirstGame = false;
});

btnRestart.addEventListener('click', () => {
    console.log('restart');
    showGamePage();
    main.reset();
    main.isStart = true;
    isFirstGame = false;
});

btnQuit.addEventListener('click', () => {
    console.log('quit');
    showHomePage();
    main.reset();
    main.isStart = false;
    isFirstGame = true;
});

setInterval(() => {
    fps.innerHTML = currentFps;
}, 1000);

const clock = new Clock();

const tick = () => {
    requestAnimationFrame(tick);

    clock.start();

    currentFps = clock.getFps();
    deltaTime = clock.getDeltaTime();

    if (main.isStart) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.drawImage(
            background.imgElement,
            0,
            0,
            background.width() * 20,
            background.height() * 20
        );
        main.render();
    } else {
        if (isFirstGame) {
            showHomePage();
        } else {
            showGameoverPage();
        }
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

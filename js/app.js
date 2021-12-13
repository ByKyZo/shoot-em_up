const canvas = document.querySelector('canvas');
const home = document.querySelector('#home');
const gameover = document.querySelector('#gameover');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// TODO : Gérer le delta time
// TODO : Déclarer les attributs directement dans le constructor (verifie l'autocompletion dans les autres class)
// TODO : Faire une class que sera le parent de tout les elements du canvas : class GameObject() -> avec x/y/top/right/bottom/left/draw/update etc...
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
        godmode: true,
    };

    isStart = true;
    score = 0;
    spaceship = new Spaceship();
    EnemySpawner = new EnemySpawner();

    render() {
        this.spaceship.render();

        this.spaceship.drawMissile((missile, missileIndex) =>
            this.EnemySpawner.checkMissileCollideOnEnemy(missile, missileIndex, () => {
                this.score++;
                console.log(this.score);
            })
        );

        if (!this.config.godmode) {
            console.log('godmode no active');
            this.EnemySpawner.checkSpaceshipCollideOnEnemy(() => {
                this.isStart = false;
                console.log('end');
            });
        }

        this.EnemySpawner.renderEnemies();
    }

    init() {
        this.spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
        this.EnemySpawner = new EnemySpawner(this.spaceship);
        this.spaceship.init();
    }
}

const main = new Main();
main.init();

const sprite = new Sprite();
const background = sprite.getStars();

const showHomePage = () => {
    canvas.style.display = 'none';
    home.style.display = 'flex';
    gameover.style.display = 'none';
};
const showGameoverPage = () => {
    canvas.style.display = 'none';
    home.style.display = 'none';
    gameover.style.display = 'flex';
};
const showGamePage = () => {
    canvas.style.display = 'flex';
    home.style.display = 'none';
    gameover.style.display = 'none';
};

// showHomePage();

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
        main.render();
    } else {
        // canvas.style.display = 'none';
        // home.style.display = 'none';
        // gameover.style.display = 'flex';
        // console.log('end');
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

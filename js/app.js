const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

const spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
spaceship.init();

const enemies = [];

setInterval(() => {
    const enemy = new Enemy();
    enemy.init();
    enemies.push(enemy);
    console.log(enemies.length);
}, 200);

const animate = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    spaceship.run();

    enemies.forEach((enemy, index) => {
        enemy.run();
        const enemyOutOfMap = enemy.props.y - enemy.props.height * 4 > window.innerHeight;
        if (enemyOutOfMap) {
            enemies.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
};

animate();

// Ajustement de la taille du canvas
const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
handleResize();
window.addEventListener('resize', handleResize);

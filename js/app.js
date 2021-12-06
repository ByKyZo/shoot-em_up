const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

class Spaceship {
    config = {
        speed: 6,
        rocketSpeed: 12,
    };
    props = {
        x: null,
        y: null,
        width: 30,
        height: 30,
        missileWidth: 6,
        missileHeight: 24,
        state: [],
        missiles: [],
    };

    constructor(x, y) {
        this.props.x = x - this.props.width / 2;
        this.props.y = y - this.props.height / 2;
    }

    init() {
        this.handleListener();
    }

    run() {
				this.handleMove();
        this.drawShip();
        this.drawMissile();
    }

    handleMove() {
        const checkCollisionTopY = this.props.y - this.config.speed > 0;
        const checkCollisionRightX =
            this.props.x + this.config.speed + this.props.width < window.innerWidth;
        const checkCollisionBottomY =
            this.props.y + this.config.speed + this.props.height < window.innerHeight;
        const checkCollisionLeftX = this.props.x - this.config.speed > 0;

        if (this.props.state.includes('top') && checkCollisionTopY) {
            this.props.y -= this.config.speed;
        }
        if (this.props.state.includes('right') && checkCollisionRightX) {
            this.props.x += this.config.speed;
        }
        if (this.props.state.includes('bottom') && checkCollisionBottomY) {
            this.props.y += this.config.speed;
        }
        if (this.props.state.includes('left') && checkCollisionLeftX) {
            this.props.x -= this.config.speed;
        }
    }

    handleListener() {
        // todo : remove les events
        window.addEventListener('keydown', (e) => {
            const topIndex = this.props.state.indexOf('top');
            const rightIndex = this.props.state.indexOf('right');
            const bottomIndex = this.props.state.indexOf('bottom');
            const leftIndex = this.props.state.indexOf('left');

            if (e.key === 'ArrowUp' && topIndex === -1) {
                this.props.state.push('top');
            }
            if (e.key === 'ArrowRight' && rightIndex === -1) {
                this.props.state.push('right');
            }
            if (e.key === 'ArrowDown' && bottomIndex === -1) {
                this.props.state.push('bottom');
            }
            if (e.key === 'ArrowLeft' && leftIndex === -1) {
                this.props.state.push('left');
            }
            if (e.key === ' ') {
                this.shot();
                console.log('tire missile sa mere');
            }
        });

        window.addEventListener('keyup', (e) => {
            const topIndex = this.props.state.indexOf('top');
            const rightIndex = this.props.state.indexOf('right');
            const bottomIndex = this.props.state.indexOf('bottom');
            const leftIndex = this.props.state.indexOf('left');

            if (e.key === 'ArrowUp' && topIndex !== -1) {
                this.props.state.splice(topIndex, 1);
            }
            if (e.key === 'ArrowRight' && rightIndex !== -1) {
                this.props.state.splice(rightIndex, 1);
            }
            if (e.key === 'ArrowDown' && bottomIndex !== -1) {
                this.props.state.splice(bottomIndex, 1);
            }
            if (e.key === 'ArrowLeft' && leftIndex !== -1) {
                this.props.state.splice(leftIndex, 1);
            }
        });
    }

    clearGame() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    shot() {
        this.props.missiles.push({
            x: this.props.x,
            y: this.props.y,
            width: this.props.missileWidth,
            height: this.props.missileHeight,
        });
    }

    drawShip() {
        context.fillStyle = 'blue';
        context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
    }

    drawMissile() {
        this.props.missiles.forEach((missile, index) => {
            context.fillStyle = 'white';
            context.fillRect(
                missile.x + this.props.width / 2 - missile.width / 2,
                missile.y - missile.height,
                missile.width,
                missile.height
            );

            const missileOutOfMap = missile.y - this.config.rocketSpeed < 0;
            // retire l'element du tableau (missile en dehors de la carte)
            if (missileOutOfMap) {
                this.props.missiles.splice(index, 1);
            }
            missile.y -= this.config.rocketSpeed;
        });
    }
}

class Enemy {
    config = {
        speed: 6,
    };

    props = {
        x: null,
        y: null,
        width: 30,
        height: 30,
        state: [],
    };

    random(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    init() {
        this.props.x = this.random(0, window.innerWidth);
        /*     this.props.x =100; */
        this.props.y = 0;
    }

    run() {
        context.fillStyle = 'red';
        context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
				
			const enemyOutOfMap = this.props.y + this.config.rocketSpeed > window.innerHeight;
			// retire l'element du tableau (missile en dehors de la carte)
			if (enemyOutOfMap) {
				this.props.missiles.splice(index, 1);
			}
				
        this.props.y += this.config.speed;
    }
}


const spaceship = new Spaceship(window.innerWidth / 2, window.innerHeight / 2);
spaceship.init();

const enemies = [];

setInterval(() => {
    const enemy = new Enemy();
    enemy.init();
    enemies.push(enemy);
		console.log(enemies.length)
}, 200);

const animate = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    spaceship.run();
		
    enemies.forEach((enemy, index) => {
        enemy.run();
				const enemyOutOfMap = enemy.props.y - enemy.props.height * 4  > window.innerHeight;
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

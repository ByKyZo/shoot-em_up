class Spaceship {
    /**
     *
     * La configuration du jeu
     *
     */
    config = {
        speed: 4,
        missileSpeed: 8,
        fireCooldown: 300,
    };
    /**
     *
     * Les propriétes du vaisseau
     *
     */
    props = {
        x: null,
        y: null,
        width: 30,
        height: 30,
        missileWidth: 6,
        missileHeight: 24,
        state: [],
        missiles: [],
        currentFireCooldown: 0,
    };
    /**
     *
     * Les états du vaisseau
     *
     */
    state = {
        isFireCooldownEnd: true,
        isFire: false,
        isMoveTop: false,
        isMoveRight: false,
        isMoveBottom: false,
        isMoveLeft: false,
    };

    constructor(x, y) {
        this.props.x = x - this.props.width / 2;
        this.props.y = y - this.props.height / 2;
    }
    /**
     *
     * Initialisation du vaisseau
     *
     */
    init() {
        this.handleListener();
    }
    /**
     *
     * Permet de faire fonctionner le vaisseau
     * - Crée le vaisseau
     * - Crée les missiles
     * - Gere les differents etats (avancer : en haut / a droite / en bas / a gauche , et le tire) du vaisseau en fonction des touches préssées
     *
     */
    run() {
        this.handleMove();
        this.drawSpaceship();
        this.drawMissile();
    }

    handleMove() {
        const checkCollisionTopY = this.props.y - this.config.speed > 0;
        const checkCollisionRightX =
            this.props.x + this.config.speed + this.props.width < window.innerWidth;
        const checkCollisionBottomY =
            this.props.y + this.config.speed + this.props.height < window.innerHeight;
        const checkCollisionLeftX = this.props.x - this.config.speed > 0;

        if (this.state.isMoveTop && checkCollisionTopY) {
            this.props.y -= this.config.speed;
        }
        if (this.state.isMoveRight && checkCollisionRightX) {
            this.props.x += this.config.speed;
        }
        if (this.state.isMoveBottom && checkCollisionBottomY) {
            this.props.y += this.config.speed;
        }
        if (this.state.isMoveLeft && checkCollisionLeftX) {
            this.props.x -= this.config.speed;
        }
        if (this.state.isFire && checkCollisionLeftX) {
            this.fire();
        }
    }

    handleListener() {
        // todo : remove les events
        const handleState = (e) => {
            const value = e.type === 'keydown';
            if (e.key === 'ArrowUp') {
                this.state.isMoveTop = value;
            }
            if (e.key === 'ArrowRight') {
                this.state.isMoveRight = value;
            }
            if (e.key === 'ArrowDown') {
                this.state.isMoveBottom = value;
            }
            if (e.key === 'ArrowLeft') {
                this.state.isMoveLeft = value;
            }
            if (e.key === ' ') {
                this.state.isFire = value;
            }
        };
        window.addEventListener('keydown', handleState);
        window.addEventListener('keyup', handleState);
    }

    clearGame() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    fire() {
        if (this.state.isFireCooldownEnd) {
            this.props.missiles.push({
                x: this.props.x,
                y: this.props.y,
                width: this.props.missileWidth,
                height: this.props.missileHeight,
            });

            this.state.isFireCooldownEnd = false;
            this.setFireCooldown();
        }
    }

    setFireCooldown() {
        if (!this.state.isFireCooldownEnd) {
            setTimeout(() => {
                console.log('fire cooldown end');
                this.state.isFireCooldownEnd = true;
            }, this.config.fireCooldown);
        }
    }

    drawSpaceship() {
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

            const missileOutOfMap = missile.y - this.config.missileSpeed < 0;
            // retire l'element du tableau (missile en dehors de la carte)
            if (missileOutOfMap) {
                this.props.missiles.splice(index, 1);
            }
            missile.y -= this.config.missileSpeed;
        });
    }
}
// class Spaceship {
//     config = {
//         speed: 6,
//         missileSpeed: 12,
//     };
//     props = {
//         x: null,
//         y: null,
//         width: 30,
//         height: 30,
//         missileWidth: 6,
//         missileHeight: 24,
//         state: [],
//         missiles: [],
//     };

//     constructor(x, y) {
//         this.props.x = x - this.props.width / 2;
//         this.props.y = y - this.props.height / 2;
//     }

//     init() {
//         this.handleListener();
//     }

//     run() {
//         this.handleMove();
//         this.drawSpaceship();
//         this.drawMissile();
//     }

//     handleMove() {
//         const checkCollisionTopY = this.props.y - this.config.speed > 0;
//         const checkCollisionRightX =
//             this.props.x + this.config.speed + this.props.width < window.innerWidth;
//         const checkCollisionBottomY =
//             this.props.y + this.config.speed + this.props.height < window.innerHeight;
//         const checkCollisionLeftX = this.props.x - this.config.speed > 0;

//         if (this.props.state.includes('top') && checkCollisionTopY) {
//             this.props.y -= this.config.speed;
//         }
//         if (this.props.state.includes('right') && checkCollisionRightX) {
//             this.props.x += this.config.speed;
//         }
//         if (this.props.state.includes('bottom') && checkCollisionBottomY) {
//             this.props.y += this.config.speed;
//         }
//         if (this.props.state.includes('left') && checkCollisionLeftX) {
//             this.props.x -= this.config.speed;
//         }
//         if (this.props.state.includes('fire') && checkCollisionLeftX) {
//             // this.props.x -= this.config.speed;
//             this.fire();
//         }
//     }

//     handleListener() {
//         // todo : remove les events
//         window.addEventListener('keydown', (e) => {
//             const topIndex = this.props.state.indexOf('top');
//             const rightIndex = this.props.state.indexOf('right');
//             const bottomIndex = this.props.state.indexOf('bottom');
//             const leftIndex = this.props.state.indexOf('left');

//             const fireIndex = this.props.state.indexOf('fire');

//             if (e.key === 'ArrowUp' && topIndex === -1) {
//                 this.props.state.push('top');
//             }
//             if (e.key === 'ArrowRight' && rightIndex === -1) {
//                 this.props.state.push('right');
//             }
//             if (e.key === 'ArrowDown' && bottomIndex === -1) {
//                 this.props.state.push('bottom');
//             }
//             if (e.key === 'ArrowLeft' && leftIndex === -1) {
//                 this.props.state.push('left');
//             }
//             if (e.key === ' ' && fireIndex === -1) {
//                 this.props.state.push('fire');
//                 // this.fire();
//                 console.log('tire missile sa mere');
//             }
//         });

//         window.addEventListener('keyup', (e) => {
//             const topIndex = this.props.state.indexOf('top');
//             const rightIndex = this.props.state.indexOf('right');
//             const bottomIndex = this.props.state.indexOf('bottom');
//             const leftIndex = this.props.state.indexOf('left');

//             const fireIndex = this.props.state.indexOf('fire');

//             if (e.key === 'ArrowUp' && topIndex !== -1) {
//                 this.props.state.splice(topIndex, 1);
//             }
//             if (e.key === 'ArrowRight' && rightIndex !== -1) {
//                 this.props.state.splice(rightIndex, 1);
//             }
//             if (e.key === 'ArrowDown' && bottomIndex !== -1) {
//                 this.props.state.splice(bottomIndex, 1);
//             }
//             if (e.key === 'ArrowLeft' && leftIndex !== -1) {
//                 this.props.state.splice(leftIndex, 1);
//             }
//             if (e.key === ' ' && fireIndex !== -1) {
//                 this.props.state.splice(fireIndex, 1);
//                 this.fire();
//                 console.log('tire missile sa mere');
//             }
//         });
//     }

//     clearGame() {
//         context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     }

//     fire() {
//         this.props.missiles.push({
//             x: this.props.x,
//             y: this.props.y,
//             width: this.props.missileWidth,
//             height: this.props.missileHeight,
//         });
//     }

//     drawSpaceship() {
//         context.fillStyle = 'blue';
//         context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
//     }

//     drawMissile() {
//         this.props.missiles.forEach((missile, index) => {
//             context.fillStyle = 'white';
//             context.fillRect(
//                 missile.x + this.props.width / 2 - missile.width / 2,
//                 missile.y - missile.height,
//                 missile.width,
//                 missile.height
//             );

//             const missileOutOfMap = missile.y - this.config.missileSpeed < 0;
//             // retire l'element du tableau (missile en dehors de la carte)
//             if (missileOutOfMap) {
//                 this.props.missiles.splice(index, 1);
//             }
//             missile.y -= this.config.missileSpeed;
//         });
//     }
// }

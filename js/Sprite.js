class Sprite {
    // TODO : remove les images du DOM apres le querySelector
    spaceship = {
        imgElement: document.querySelector('#spaceship'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    missile = {
        imgElement: document.querySelector('#missile'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    enemy = {
        imgElement: document.querySelector('#enemy'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    background = {
        imgElement: document.querySelector('#background'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    constructor() {}

    getSpaceshipSprite() {
        return this.spaceship;
    }

    getMissileSpritesheet() {
        return this.missile;
    }

    getEnemySpritesheet() {
        return this.enemy;
    }

    getBackground() {
        return this.background;
    }
}

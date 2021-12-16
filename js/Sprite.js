class Sprite {
    // TODO : remove les images du DOM apres le querySelector
    constructor() {
        this.spaceship = {
            imgElement: document.querySelector('#spaceship'),
            width: function () {
                return this.imgElement.width;
            },
            height: function () {
                return this.imgElement.height;
            },
        };

        this.missile = {
            imgElement: document.querySelector('#missile'),
            width: function () {
                return this.imgElement.width;
            },
            height: function () {
                return this.imgElement.height;
            },
        };

        this.enemy = {
            imgElement: document.querySelector('#enemy'),
            width: function () {
                return this.imgElement.width;
            },
            height: function () {
                return this.imgElement.height;
            },
        };

        this.background = {
            imgElement: document.querySelector('#background'),
            width: function () {
                return this.imgElement.width;
            },
            height: function () {
                return this.imgElement.height;
            },
        };
    }

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

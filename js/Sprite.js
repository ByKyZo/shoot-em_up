class Sprite {
    // TODO : remove les images du DOM apres le querySelector
    spaceship = {
        imgElement: document.querySelector('#ship-spritesheet'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    missile = {
        imgElement: document.querySelector('#missile-spritesheet'),
        // imgElement: () => {
        //     const imgElement = document.querySelector('#missile-spritesheet');
        //     imgElement.remove();
        //     return imgElement;
        // },
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

    enemy = {
        imgElement: document.querySelector('#enemy-spritesheet'),
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
    stars = {
        imgElement: document.querySelector('#stars'),
        width: function () {
            return this.imgElement.width;
        },
        height: function () {
            return this.imgElement.height;
        },
    };

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
    getStars() {
        return this.stars;
    }
}

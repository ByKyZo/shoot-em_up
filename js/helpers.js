const randomInt = (min, max) => {
    return Math.floor(randomFloat(min, max));
};

const randomFloat = (min, max) => {
    // return Math.random() * (max - min + 1) + min;
    return Math.random() * (max - min) + min;
};

const checkCollision = (targetA, targetB) => {
    return (
        targetA.top < targetB.bottom &&
        targetA.right > targetB.left &&
        targetA.bottom > targetB.top &&
        targetA.left < targetB.right
    );
};

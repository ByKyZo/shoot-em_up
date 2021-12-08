const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomDecimal = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

const checkCollision = (targetA, targetB) => {
    return (
        targetA.top < targetB.bottom &&
        targetA.right > targetB.left &&
        targetA.bottom > targetB.top &&
        targetA.left < targetB.right
    );
};

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomDecimal = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

const checkCollision = (targetA, targetB) => {
    // return (
    //     targetA.top < targetB.bottom &&
    //     targetA.right < targetB.left &&
    //     targetA.bottom > targetB.top &&
    //     targetA.left > targetB.right
    // );
    return (
        targetA.top < targetB.bottom &&
        targetA.right > targetB.left &&
        targetA.bottom > targetB.top &&
        targetA.left < targetB.right
    );
    // return (
    //     targetA.x < targetB.x + targetB.width &&
    //     targetA.x + targetA.width > targetB.x &&
    //     targetA.y < targetB.y + targetB.height &&
    //     targetA.height + targetA.y > targetB.y
    // );
    // if (targetA.x < targetB.x + targetB.width &&
    //     targetA.x + targetA.width > targetB.x &&
    //     targetA.y < targetB.y + targetB.height &&
    //     targetA.height + targetA.y > targetB.y) {
};

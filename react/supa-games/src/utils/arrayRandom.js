import getRandomInt from "../utils/mathRandom";

function arrayRandom(array, maxIndex) {
    const randomIndex = getRandomInt(array.length - maxIndex);
    const randomArray = array.slice(randomIndex, randomIndex + (maxIndex+1));
    return randomArray;
};

export default arrayRandom;

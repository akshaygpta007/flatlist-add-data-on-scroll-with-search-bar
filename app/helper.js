const randomWord = () => {
    const randomNumberBetween3To15 = randomNumber(3, 15);
    let randomWord = '';
    for (let i = 0; i < randomNumberBetween3To15; i ++) {
        randomWord = `${randomWord}${String.fromCharCode(randomNumber(97, 122))}`
    }
    return randomWord;
}

const randomData = (layer) => {
    const data = [];
    for (let i = 0; i < 50; i ++) {
        data.push({
            no: i + (layer * 50),
            word: `${randomWord()} ${randomWord()}`,
        });
    }
    return data;
};

const randomNumber = (start, end) => Math.floor(Math.random() * (end - start)) + start

const generateRandomNumber10To50 = () => randomNumber(10, 50);

// Use this to have space with fixed width for particular no.
// Help in not randomizing really the space with doesn't look good
const generateRandomNumber10To50v2 = (index) => (index % 40) + 10;

export {
    randomData,
    generateRandomNumber10To50,
    generateRandomNumber10To50v2,
};

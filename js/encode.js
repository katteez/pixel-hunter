const encodeEnum = {
  UNKNOWN: 0,
  WRONG: 1,
  SLOW: 2,
  NORMAL: 3,
  FAST: 4
};

const decodeEnum = {
  0: `UNKNOWN`,
  1: `WRONG`,
  2: `SLOW`,
  3: `NORMAL`,
  4: `FAST`
};

const encode = (gameState) => {
  let encodedState = gameState.answers.reduce((result, answer) => {
    result += `${encodeEnum[answer.toUpperCase()]}|`;
    return result;
  }, ``);
  encodedState += `${gameState.time}|`;
  encodedState += `${gameState.lives}|`;
  encodedState += `${gameState.questionNumber}|`;
  encodedState += `${gameState.win ? 1 : 0}|`;

  return encodedState;
};

const decode = (string) => {
  const array = string.split(`|`);
  array.pop();
  const win = parseInt(array.pop(), 10) ? true : false;
  const questionNumber = parseInt(array.pop(), 10);
  const lives = parseInt(array.pop(), 10);
  const time = parseInt(array.pop(), 10);
  const answers = array.map((code) => {
    return decodeEnum[code].toLowerCase();
  });

  return {
    time,
    lives,
    questionNumber,
    win,
    answers
  };
};

export {encode, decode};

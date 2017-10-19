import assert from 'assert';
import getScore from './get-score';

const allSlowAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `slow`
});

const allNormalAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `normal`
});

const allFastAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `fast`
});

const eightSlowAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `slow`
}).fill({
  isCorrect: false,
  answerRate: `slow`
}, 8);

const eightNormalAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `normal`
}).fill({
  isCorrect: false,
  answerRate: `normal`
}, 8);

const eightFastAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `fast`
}).fill({
  isCorrect: false,
  answerRate: `fast`
}, 8);

const sevenSlowAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `slow`
}).fill({
  isCorrect: false,
  answerRate: `slow`
}, 7);

const sevenNormalAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `normal`
}).fill({
  isCorrect: false,
  answerRate: `normal`
}, 7);

const sevenFastAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `fast`
}).fill({
  isCorrect: false,
  answerRate: `fast`
}, 7);

const threeSlow3Fast4NormalAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `slow`
}).fill({
  isCorrect: true,
  answerRate: `fast`
}, 3).fill({
  isCorrect: true,
  answerRate: `normal`
}, 6);

const notAllAnswers = Array(9).fill({
  isCorrect: true,
  answerRate: `normal`
});

const sixNormalAnswers = Array(10).fill({
  isCorrect: true,
  answerRate: `normal`
}).fill({
  isCorrect: false,
  answerRate: `normal`
}, 6);

const allWrongNormalAnswers = Array(10).fill({
  isCorrect: false,
  answerRate: `normal`
});

describe(`Test getScore().`, () => {

  /*
  * Не все данные получены или данные в неверном формате
  */
  it(`Не получены данные об ответах`, () => {
    assert.throws(function () {
      getScore(void 0, 3);
    }, Error, `Not an array`);
  });

  it(`Тип полученных ответов не массив`, () => {
    assert.throws(function () {
      getScore({}, 3);
    }, Error, `Not an array`);
    assert.throws(function () {
      getScore(`string`, 3);
    }, Error, `Not an array`);
    assert.throws(function () {
      getScore(null, 3);
    }, Error, `Not an array`);
    assert.throws(function () {
      getScore(10, 3);
    }, Error, `Not an array`);
  });

  it(`Не получены данные о количестве оставшихся жизней`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers);
    }, Error, `Not a number`);
  });

  it(`Тип полученного количества жизней не число`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, []);
    }, Error, `Not a number`);
    assert.throws(function () {
      getScore(allNormalAnswers, {});
    }, Error, `Not a number`);
    assert.throws(function () {
      getScore(allNormalAnswers, `3`);
    }, Error, `Not a number`);
    assert.throws(function () {
      getScore(allNormalAnswers, `string`);
    }, Error, `Not a number`);
    assert.throws(function () {
      getScore(allNormalAnswers, null);
    }, Error, `Not a number`);
  });

  /*
  * Игра пройдена. Подсчет очков
  */
  it(`Игрок ответил на все вопросы правильно с медленной скоростью. Остались все жизни`, () => {
    assert.equal(getScore(allSlowAnswers, 3), 650);
  });

  it(`Игрок ответил на все вопросы правильно с нормальной скоростью. Остались все жизни`, () => {
    assert.equal(getScore(allNormalAnswers, 3), 1150);
  });

  it(`Игрок ответил на все вопросы правильно с быстрой скоростью. Остались все жизни`, () => {
    assert.equal(getScore(allFastAnswers, 3), 1650);
  });

  it(`Игрок ответил на 8 вопросов правильно с медленной скоростью. Осталась 1 жизнь`, () => {
    assert.equal(getScore(eightSlowAnswers, 1), 450);
  });

  it(`Игрок ответил на 8 вопросов правильно с нормальной скоростью. Осталась 1 жизнь`, () => {
    assert.equal(getScore(eightNormalAnswers, 1), 850);
  });

  it(`Игрок ответил на 8 вопросов правильно с быстрой скоростью. Осталась 1 жизнь`, () => {
    assert.equal(getScore(eightFastAnswers, 1), 1250);
  });

  it(`Игрок ответил на 7 вопросов правильно с медленной скоростью. Осталось 0 жизней`, () => {
    assert.equal(getScore(sevenSlowAnswers, 0), 350);
  });

  it(`Игрок ответил на 7 вопросов правильно с нормальной скоростью. Осталось 0 жизней`, () => {
    assert.equal(getScore(sevenNormalAnswers, 0), 700);
  });

  it(`Игрок ответил на 7 вопросов правильно с быстрой скоростью. Осталось 0 жизней`, () => {
    assert.equal(getScore(sevenFastAnswers, 0), 1050);
  });

  it(`Игрок ответил на все вопросы правильно: на 3 медленно, на 3 быстро, на 4 нормально. Осталось 3 жизни`, () => {
    assert.equal(getScore(threeSlow3Fast4NormalAnswers, 3), 1150);
  });

  /*
  * Игра не пройдена
  */
  it(`Игрок ответил не на все вопросы. Игра не пройдена`, () => {
    assert.equal(getScore(notAllAnswers, 3), -1);
  });

  it(`Игрок ответил на 6 вопросов правильно с нормальной скоростью. Осталось 0 жизней. Игра не пройдена`, () => {
    assert.equal(getScore(sixNormalAnswers, 0), -1);
  });

  /*
  * Проверка невозможных результатов
  */
  it(`Игрок ответил на все вопросы неправильно с нормальной скоростью. Остались все жизни. Игра не пройдена`, () => {
    assert.equal(getScore(allWrongNormalAnswers, 3), -1);
  });

  it(`Игрок ответил на все вопросы правильно с нормальной скоростью. Осталась -1 жизнь. Игра не пройдена`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, -1);
    }, Error, `Decreased the allowed count of lives`);
  });

  it(`Игрок ответил на все вопросы правильно с нормальной скоростью. Остались 4 жизни. Игра не пройдена`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, 4);
    }, Error, `Exceeded the allowed count of lives`);
  });
});

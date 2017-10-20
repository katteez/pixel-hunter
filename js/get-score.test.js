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

describe(`Тестирование функции getScore().`, () => {

  /*
  * Вызов функции с неверными параметрами
  */

  it(`Бросает ошибку, если вызвана с неверным типом параметра answers`, () => {
    assert.throws(function () {
      getScore({}, 3);
    }, Error, `Not an array`);
  });

  it(`Бросает ошибку, если вызвана с неверным типом параметра remainingLives`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, `string`);
    }, Error, `Not a number`);
  });

  /*
  * Игра пройдена. Подсчет очков
  */
  it(`Возвращает 650, если вызвана с 10 правильными медленными ответами и 3 жизнями`, () => {
    assert.equal(getScore(allSlowAnswers, 3), 650);
  });

  it(`Возвращает 1150, если вызвана с 10 правильными нормальными ответами и 3 жизнями`, () => {
    assert.equal(getScore(allNormalAnswers, 3), 1150);
  });

  it(`Возвращает 1650, если вызвана с 10 правильными быстрыми ответами и 3 жизнями`, () => {
    assert.equal(getScore(allFastAnswers, 3), 1650);
  });

  it(`Возвращает 450, если вызвана с 8 правильными медленными и 2 неправильными ответами и 1 жизнью`, () => {
    assert.equal(getScore(eightSlowAnswers, 1), 450);
  });

  it(`Возвращает 850, если вызвана с 8 правильными нормальными и 2 неправильными ответами и 1 жизнью`, () => {
    assert.equal(getScore(eightNormalAnswers, 1), 850);
  });

  it(`Возвращает 1250, если вызвана с 8 правильными быстрыми и 2 неправильными ответами и 1 жизнью`, () => {
    assert.equal(getScore(eightFastAnswers, 1), 1250);
  });

  it(`Возвращает 350, если вызвана с 7 правильными медленными и 3 неправильными ответами и 0 жизней`, () => {
    assert.equal(getScore(sevenSlowAnswers, 0), 350);
  });

  it(`Возвращает 700, если вызвана с 7 правильными нормальными и 3 неправильными ответами и 0 жизней`, () => {
    assert.equal(getScore(sevenNormalAnswers, 0), 700);
  });

  it(`Возвращает 1050, если вызвана с 7 правильными быстрыми и 3 неправильными ответами и 0 жизней`, () => {
    assert.equal(getScore(sevenFastAnswers, 0), 1050);
  });

  it(`Возвращает 1150, если вызвана с 7 правильными (3 медленными, 3 быстрыми, 4 нормальными) и 3 неправильными ответами и 3 жизнями`, () => {
    assert.equal(getScore(threeSlow3Fast4NormalAnswers, 3), 1150);
  });

  /*
  * Игра не пройдена
  */
  it(`Возвращает -1, если вызвана с менее, чем 10 ответами`, () => {
    assert.equal(getScore(notAllAnswers, 3), -1);
  });

  it(`Возвращает -1, если вызвана с 6 правильными нормальными ответами и 0 жизней`, () => {
    assert.equal(getScore(sixNormalAnswers, 0), -1);
  });

  /*
  * Проверка невозможных результатов
  */
  it(`Возвращает -1, если вызвана с 10 неправильными нормальными ответами и 3 жизнями`, () => {
    assert.equal(getScore(allWrongNormalAnswers, 3), -1);
  });

  it(`Возвращает -1, если вызвана с 10 правильными нормальными ответами и -1 жизнью`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, -1);
    }, Error, `Decreased the allowed count of lives`);
  });

  it(`Бросает ошибку, если вызвана с 10 нормальными ответами и 4 жизнями`, () => {
    assert.throws(function () {
      getScore(allNormalAnswers, 4);
    }, Error, `Exceeded the allowed count of lives`);
  });
});

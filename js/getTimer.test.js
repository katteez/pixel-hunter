import assert from 'assert';
import getTimer from './getTimer';

describe(`Тестирование функции getTimer().`, () => {

  /*
  * Не все данные получены или данные в неверном формате
  */
  it(`Бросает ошибку, если вызвана без переданного параметра time`, () => {
    assert.throws(function () {
      getTimer();
    }, Error, `Not an integer`);
  });

  it(`Бросает ошибку, если вызвана с неверным типом параметра time`, () => {
    assert.throws(function () {
      getTimer([]);
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer({});
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer(`string`);
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer(10.5);
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer(null);
    }, Error, `Not an integer`);
  });

  it(`Бросает ошибку, если вызвана с отрицательным значением`, () => {
    assert.throws(function () {
      getTimer(-1);
    }, Error, `Passed argument is negative value`);
  });

  /*
  * Таймер создан. Проверка его работы
  */
  it(`Если вызвана со временем 30, возвращает объект с ключом value, равным 30,`, () => {
    assert.equal(getTimer(30).value, 30);
  });

  it(`Если вызвана со временем 30, возвращает объект с методом tick(), при одном вызове которого возвращается 29, при втором - 28`, () => {
    const timer = getTimer(30);
    assert.equal(timer.tick(), 29);
    assert.equal(timer.tick(), 28);
  });

  it(`Если вызвана со временем 1, возвращает объект с методом tick(), при одном вызове которого возвращается строка \`Time is up\``, () => {
    assert.equal(getTimer(1).tick(), `Time is up`);
  });

  it(`Если вызвана со временем 0, возвращает объект с методом tick(), при одном вызове которого возвращается строка \`Time is up\``, () => {
    assert.equal(getTimer(0).tick(), `Time is up`);
  });

  it(`Если вызвана со временем 1, возвращает объект с методом tick(), при трех вызовах которого возвращается строка \`Time is up\``, () => {
    const timer = getTimer(1);
    assert.equal(timer.tick(), `Time is up`);
    assert.equal(timer.tick(), `Time is up`);
    assert.equal(timer.tick(), `Time is up`);
  });
});

import assert from 'assert';
import getTimer from './get-timer';

describe(`Таймер.`, () => {

  /*
  * Вызов функции с неверным параметром
  */
  it(`Бросает ошибку, если вызвана с неверным типом параметра time`, () => {
    assert.throws(function () {
      getTimer(10.5);
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
  it(`Создает новый таймер с установленным временем,`, () => {
    assert.equal(getTimer(30).value, 30);
  });

  it(`Уменьшает время на единицу при каждом вызове`, () => {
    const timer = getTimer(30);
    assert.equal(timer.tick(), 29);
    assert.equal(timer.tick(), 28);
  });

  it(`Возвращает \`Time is up\`, если таймер закончен`, () => {
    assert.equal(getTimer(1).tick(), `Time is up`);
  });

  it(`Возвращает \`Time is up\`, если таймер создан с оставшимся временем 0`, () => {
    assert.equal(getTimer(0).tick(), `Time is up`);
  });

  it(`Возвращает \`Time is up\` при всех вызовах после того, как таймер закончен`, () => {
    const timer = getTimer(1);
    assert.equal(timer.tick(), `Time is up`);
    assert.equal(timer.tick(), `Time is up`);
    assert.equal(timer.tick(), `Time is up`);
  });

  it(`Запускает/останавливает таймаут`, () => {
    const timer = getTimer(30);
    timer.start();
    assert.equal(!!timer._timeoutId, true);
    timer.stop();
    assert.equal(!!timer._timeoutId, false);
  });
});

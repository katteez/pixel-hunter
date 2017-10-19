import assert from 'assert';
import getTimer from './getTimer';

describe(`Test getTimer().`, () => {

  /*
  * Не все данные получены или данные в неверном формате
  */
  it(`В таймер не передано время`, () => {
    assert.throws(function () {
      getTimer();
    }, Error, `Not an integer`);
  });

  it(`Тип полученного времени не целое число`, () => {
    assert.throws(function () {
      getTimer([]);
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer({});
    }, Error, `Not an integer`);
    assert.throws(function () {
      getTimer(`3`);
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

  it(`В таймер передано отрицательное значение`, () => {
    assert.throws(function () {
      getTimer(-1);
    }, Error, `Passed argument is negative value`);
  });

  /*
  * Таймер создан. Проверка его работы
  */
  it(`Создан таймер с установленным временем`, () => {
    assert.equal(getTimer(30).value, 30);
  });

  it(`При каждом обновлении таймера время уменьшается на единицу`, () => {
    assert.equal(getTimer(30).tick(), 29);
  });

  it(`При достижении конца таймер сообщает, что он закончен`, () => {
    assert.equal(getTimer(1).tick(), `Time is up`);
  });

  it(`Если передано конечное значение, таймер сообщает, что он закончен`, () => {
    assert.equal(getTimer(0).tick(), `Time is up`);
  });
});

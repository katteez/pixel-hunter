const getTimer = (time) => {

  if (!Number.isInteger(time)) {
    throw new Error(`Not an integer`);
  }

  if (time < 0) {
    throw new Error(`Passed argument is negative value`);
  }

  return {
    value: time,
    tick() {
      if (this.value > 0) {
        this.value--;
      }
      if (this.value === 0) {
        return `Time is up`;
      }

      return this.value;
    }
  };
};

export default getTimer;

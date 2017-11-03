const getTimer = (time) => {

  if (!Number.isInteger(time)) {
    throw new Error(`Not an integer`);
  }

  if (time < 0) {
    throw new Error(`Passed argument is negative value`);
  }

  return {
    value: time,
    _timeoutId: null,

    tick() {
      if (this.value > 0) {
        this.value--;
      }
      if (this.value === 0) {
        return `Time is up`;
      }
      return this.value;
    },

    _goTimer() {
      this.tick();
      this._onUpdate(this.value);
      if (this.value > 0) {
        this._timeoutId = setTimeout(() => this._goTimer(), 1000);
      } else {
        this._onEnd();
      }
    },

    start() {
      this._timeoutId = setTimeout(() => this._goTimer(), 1000);
    },

    stop() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
    },

    onUpdate(callback) {
      this._onUpdate = callback;
    },

    onEnd(callback) {
      this._onEnd = callback;
    }
  };
};

export default getTimer;

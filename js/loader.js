const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `katteez`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Неизвестный статус (${response.status}) ${response.statusText}`);
      }
    });
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Неизвестный статус (${response.status}) ${response.statusText}`);
      }
    });
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }

  static preloadImages(gameData) {
    const promises = [];
    for (const question of gameData) {
      for (const imageData of question.answers) {
        promises.push(new Promise((resolve) => {
          const img = document.createElement(`img`);
          img.src = imageData.image.url;
          img.onload = resolve;
          img.onerror = resolve;
        }));
      }
    }
    return Promise.all(promises).then(() => gameData);
  }
}

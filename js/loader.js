const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

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
}

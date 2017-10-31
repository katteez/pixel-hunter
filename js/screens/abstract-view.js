import getHtmlElement from '../create-element';

export default class AbstractView {
  get template() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return getHtmlElement(this.template);
  }

  bind() {}
}

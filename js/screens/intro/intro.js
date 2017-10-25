import getHtmlElement from '../../create-element';
import renderScreen from '../../render-screen';
import data from './intro-data';

const innerHtml = String.raw`
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup>${data.text}</p>
    </div>
  </div>`;

const intro = getHtmlElement(innerHtml);
const asterisk = intro.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => {
  renderScreen(data.nextScreen);
});

export default intro;

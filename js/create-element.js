const getHtmlElement = (htmlAsString) => {
  let element = document.createElement(`div`);
  element.innerHTML = htmlAsString;
  return element;
};

export default getHtmlElement;

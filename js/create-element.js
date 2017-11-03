const getHtmlElement = (htmlAsString) => {
  const element = document.createElement(`div`);
  element.innerHTML = htmlAsString;
  return element;
};

export default getHtmlElement;

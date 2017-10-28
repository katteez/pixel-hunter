const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomElement = (arr) => arr[getRandomFromInterval(0, arr.length)];

const getUniqueImgArray = (dataArray, imgCount) => {
  const paintArray = dataArray.filter((img) => img.imgType === `paint`);
  const photoArray = dataArray.filter((img) => img.imgType === `photo`);
  let imgArray = [];

  if (imgCount === 2) {
    imgArray = [
      getRandomElement(paintArray),
      getRandomElement(photoArray)
    ];
    if (getRandomFromInterval(0, 2)) {
      imgArray = imgArray.reverse();
    }
  }

  if (imgCount > 2) {
    while (imgArray.length < imgCount) {
      let img = getRandomElement(photoArray);
      if (imgArray.indexOf(img) === -1) {
        imgArray.push(img);
      }
    }
    const randomIndex = getRandomFromInterval(0, imgCount);
    imgArray[randomIndex] = getRandomElement(paintArray);
  }

  return imgArray;
};

export {getRandomFromInterval, getUniqueImgArray};

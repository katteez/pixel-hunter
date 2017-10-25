const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getUniqueImgArray = (dataArray, imgCount) => {
  const paintArray = dataArray.filter((img) => img.imgType === `paint`);
  const photoArray = dataArray.filter((img) => img.imgType === `photo`);
  let imgArray = [];

  if (imgCount === 2) {
    imgArray = [
      paintArray[getRandomFromInterval(0, paintArray.length)],
      photoArray[getRandomFromInterval(0, photoArray.length)]
    ];
    if (getRandomFromInterval(0, 2)) {
      imgArray = imgArray.reverse();
    }
  }

  if (imgCount > 2) {
    while (imgArray.length < imgCount) {
      let img = photoArray[getRandomFromInterval(0, photoArray.length)];
      if (imgArray.indexOf(img) === -1) {
        imgArray.push(img);
      }
    }
    const randomIndex = getRandomFromInterval(0, imgCount);
    imgArray[randomIndex] = paintArray[getRandomFromInterval(0, paintArray.length)];
  }

  return imgArray;
};

export {getRandomFromInterval, getUniqueImgArray};

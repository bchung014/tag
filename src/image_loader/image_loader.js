export const imageLoader = imagePath => {
  const image = new Image();
  image.src = imagePath;
  return image;
};
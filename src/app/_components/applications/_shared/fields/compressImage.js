const MAX_EDGE = 2000;
const QUALITY = 0.8;

export const fitWithin = (width, height, max = MAX_EDGE) => {
  const scale = Math.min(1, max / Math.max(width, height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
};

const asJpegName = name => `${name.replace(/\.[^.]+$/, '')}.jpg`;

export const compressImage = file => {
  if (!file.type.startsWith('image/')) return Promise.resolve(file);

  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    const done = result => {
      URL.revokeObjectURL(url);
      resolve(result);
    };

    image.onerror = () => done(file);
    image.onload = () => {
      const { width, height } = fitWithin(image.width, image.height);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
      canvas.toBlob(
        blob =>
          done(blob && blob.size < file.size ? new File([blob], asJpegName(file.name), { type: 'image/jpeg' }) : file),
        'image/jpeg',
        QUALITY,
      );
    };

    image.src = url;
  });
};

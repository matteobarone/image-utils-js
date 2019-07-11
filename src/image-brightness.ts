export function getImageBrightness(imageSrc: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!imageSrc) {
      reject('No image found');
    }

    const img = document.createElement('img') as HTMLImageElement;
    img.src = imageSrc;
    img.crossOrigin = 'Anonymous';

    let colorSum = 0;

    img.onload = () => {
      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r, g, b, avg;

      for (let i = 0; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }
      const imgArea = (img.width * img.height) || 1;
      const brightness = Math.floor(colorSum / imgArea);

      resolve(brightness);
    };

    img.onerror = (e) => {
      reject(e);
    }
  });
}

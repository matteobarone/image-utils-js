import {getImageBrightness} from './image-brightness';

describe('image-brightness', () => {
  let imageOnload = null;

  function mockCanvasProperty() {
    (window as any).HTMLCanvasElement.prototype.getContext = () => ({
      drawImage: () => {},
      getImageData: () => ({data: [1, 2, 3]}),
    });
  }

  function mockImageProperty() {
    Object.defineProperty(Image.prototype, 'onload', {
      get: function () {
        return this._onload;
      },
      set: function (fn) {
        imageOnload = fn;
        this._onload = fn;
      },
    });
  }

  it('should return a number between 0 and 255', (done) => {
    mockImageProperty();
    mockCanvasProperty();
    const url = 'test.jpg';
    const img = document.createElement('img') as any;
    img.src = url;

    getImageBrightness(url).then((n) => {
      expect(n).toBeTruthy();
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(255);
      done();
    });

    imageOnload();
  })
});

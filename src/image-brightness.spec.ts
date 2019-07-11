import {getImageBrightness} from './image-brightness';

describe('image-brightness', () => {
  const url = 'test.jpg';
  let imageOnload = null;
  let imageOnError = null;
  let img;

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

    Object.defineProperty(Image.prototype, 'onerror', {
      get: function () {
        return this._onerror;
      },
      set: function (fn) {
        imageOnError = fn;
        this._onerror = fn;
      }
    });
  }

  beforeAll(() => {
    mockImageProperty();
    mockCanvasProperty();
    img = document.createElement('img') as any;
    img.src = 'test.jpg';
  });

  it('should return a number between 0 and 255', (done) => {
    getImageBrightness(url).then((n) => {
      expect(n).toBeTruthy();
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(255);
      done();
    });

    imageOnload();
  });

  it('should throw an error', (done) => {
    getImageBrightness(url).catch((err) => {
      expect(err).toBe('generic error');
      done();
    });

    imageOnError('generic error');
  });

  it('should throw an error if image url is not set', (done) => {
    getImageBrightness('').catch((err) => {
      expect(err).toBe('No image found');
      done();
    });
  });
});

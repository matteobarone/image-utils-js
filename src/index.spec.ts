import * as module from './index';

describe('Index', () => {
  it('should be exported', function () {
    expect(module.getImageBrightness).toBeTruthy();
  });
});

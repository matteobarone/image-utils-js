# image-utils-js
Set of utilities for image

### Methods

- `getImageBrightness`: promise that when resolved return a number from 0 to 255 (0 dark / 255 light).
```
import {getImageBrightness} from 'image-utils-js'
const url = 'image-url.jpg';
getImageBrightness(url).then((n) => console.log(n))
```

# Thum.io JS API

JS bindings for [Thum.io](https://www.thum.io), a fast and reliable website screenshot generator.  Can be used in the browser or in Node.

## Installation

```bash
npm install --save thum.io
```

## Documentation

```js
import { getThumURL } from 'thum.io'

getThumURL({ url: 'https://bbc.com' }); // returns '//image.thum.io/get/https://bbc.com'
```

### Full list of options

|Option|Type|
|------|----|
|`url`|`String`|
|`protocol`|`String`|
|`auth`|`String | { key: String, type: 'raw' | 'md5' }`|

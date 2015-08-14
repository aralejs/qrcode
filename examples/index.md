# 演示文档

---

## 采用默认方式画二维码"


````html
<div id="qrcodeDefault"></div>
````

````javascript
var qrcode = require('../src/index.js');
var qrnode = new qrcode({
	text: 'http://www.alipay.com/'
});
document.getElementById('qrcodeDefault').appendChild(qrnode);
````

## 调用table画二维码

````html
<div id="qrcodeTable"></div>
````

````javascript
var qrcode = require('../src/index.js');
var qrnode = new qrcode({
	render: 'table',
	correctLevel: 0,
	pdground: '#00aaee',
	text: 'http://www.alipay.com/',
	size: 100,
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png'
});
document.getElementById('qrcodeTable').appendChild(qrnode);
````

## 调用canvas画二维码

````html
<div id="qrcodeCanvas"></div>
````

````javascript
var qrcode = require('../src/index.js');
var qrnode = new qrcode({
	render: 'canvas',
	correctLevel: 0,
	text: 'http://www.alipay.com/',
	size: 300,
	background: '#eeeeee',
	foreground: '#667766',
	pdground: '#00aaee',
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
	imageSize : 100
});
document.getElementById('qrcodeCanvas').appendChild(qrnode);
````

## 调用svg画二维码

````html
<div id="qrcodeSVG"></div>
````

````javascript
var qrcode = require('../src/index.js');
var qrnode = new qrcode({
	correctLevel: 0,
	render: 'svg',
	text: 'http://www.alipay.com/',
	size: 200,
	pdground: '#00aaee',
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
	imageSize:30
});
document.getElementById('qrcodeSVG').appendChild(qrnode);
````

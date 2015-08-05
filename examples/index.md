# 演示文档

---

## 采用默认方式画二维码"

<script src="https://a.alipayobjects.com/jquery/1.7.2/jquery.js"></script>

````html
<div id="qrcodeDefault"></div>
````

````javascript
var qrcode = require('../index.js');
var $ = require('jquery');
var qrnode = new qrcode({
	text: "http://www.alipay.com/hello?nice=to?meet=you?#3"
});
$('#qrcodeDefault').append(qrnode);
````

## 调用table画二维码

````html
<div id="qrcodeTable"></div>
````

````javascript
var qrcode = require('../index.js');
var $ = require('jquery');
var qrnode = new qrcode({
	render: "table",
	correctLevel: 0,
	pdground: '#00aaee',
	text: 'http://www.alipay.com/hello',
	width: 100,
	height: 100,
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
	imageWidth: 30,
	imageHeight: 30
});
$('#qrcodeTable').append(qrnode);
````

## 调用canvas画二维码

````html
<div id="qrcodeCanvas"></div>
````

````javascript
var qrcode = require('../index.js');
var $ = require('jquery');
var qrnode = new qrcode({
	render: "canvas",
	correctLevel: 0,
	text: "http://www.alipay.com/hello",
	width: 200,
	height: 200,
	background: "#eeeeee",
	foreground: "#667766",
	pdground: '#00aaee',
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
	imageWidth: 30,
	imageHeight: 30
});
$('#qrcodeCanvas').append(qrnode);
````

## 调用svg画二维码

````html
<div id="qrcodeSVG"></div>
````

````javascript
var qrcode = require('../index.js');
var $ = require('jquery');
var qrnode = new qrcode({
	render: "svg",
	text: "http://www.alipay.com/",
	width: 300,
	height: 300,
	pdground: '#00aaee',
	image : 'https://t.alipayobjects.com/images/rmsweb/T1ZsxhXdxbXXXXXXXX.png',
	imageWidth: 60,
	imageHeight: 60
});
$('#qrcodeSVG').append(qrnode);
````

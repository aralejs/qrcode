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
console.log(qrcode);
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
	text: 'http://www.alipay.com/hello',
	width: 1,
	height: 1
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
	foreground: "#667766"
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
	width: 400,
	height: 250
});
$('#qrcodeSVG').append(qrnode);
````

# 演示文档

---

调用canvas画二维码
<div id="qrcodeCanvas"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var q = new qrcode({
		background: "#eeeeee",
		foreground: "#111111",
		width: 300,
		height: 300,
		text	: "http://www.alipay.com"
	});
	$('#qrcodeCanvas').append(q.createCanvas());
});	
````
调用table画二维码
<div id="qrcodeTable"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var q = new qrcode({
		correctLevel: 0,
		text	: "http://www.alipay.com",
		width: 250,
		height: 250,	
	});
	$('#qrcodeTable').append(q.createTable());
});
````

调用svg画二维码
<div id="qrcodeSVG"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var q = new qrcode({
		text	: "http://www.alipay.com",
		width : 400,
		height: 250
	});
	$('#qrcodeSVG').append(q.createSVG());
});
````

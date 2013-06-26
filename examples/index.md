# 演示文档

---

调用canvas画二维码
<div id="qrcodeDefault"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var qrnode = new qrcode({
		width: 300,
		height: 300,
		text	: "http://www.alipay.com"
	});
	$('#qrcodeDefault').append(qrnode);
});	
````
调用table画二维码
<div id="qrcodeTable"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var qrnode = new qrcode({
		render: "table",
		correctLevel: 0,
		text	: "http://www.alipay.com",
		width: 250,
		height: 250,	
	});
	$('#qrcodeTable').append(qrnode);
});
````

调用svg画二维码
<div id="qrcodeSVG"></div>
````javascript
seajs.use(['$','qrcode'], function($, qrcode){
	var qrnode = new qrcode({
		render : "svg",
		text	: "http://www.alipay.com",
		width : 400,
		height: 250
	});
	$('#qrcodeSVG').append(qrnode);
});
````

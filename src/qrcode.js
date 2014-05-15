var $ = require('jquery');
var QRCodeAlg = require('./qrcodealg');
var qrcodeAlgObjCache = [];

/**
 * 二维码构造函数，主要用于绘制
 * @param  {参数列表} opt 传递参数
 * @return {}
 */	
var qrcode = function(opt) {
	if (typeof opt === 'string') { // 只编码ASCII字符串
		opt = {
			text: opt
		};
	}
	//设置默认参数
	this.options = $.extend({}, {
		text:"",
		render: "",
		width: 256,
		height: 256,
		correctLevel: 3,
		background: "#ffffff",
		foreground: "#000000"
	}, opt);

	//使用QRCodeAlg创建二维码结构
	var qrCodeAlg = null;
	for(var i = 0, l = qrcodeAlgObjCache.length; i < l; i++){
		if(qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel){
			qrCodeAlg = qrcodeAlgObjCache[i].obj;
			break;
		}
	}
	if(i == l){
	  qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
	  qrcodeAlgObjCache.push({text:this.options.text, correctLevel: this.options.correctLevel, obj:qrCodeAlg});
	}

	if(this.options.render){
		switch (this.options.render){
			case "canvas":
				return this.createCanvas(qrCodeAlg);
			case "table":
				return this.createTable(qrCodeAlg);
			case "svg":
				return this.createSVG(qrCodeAlg);
			default:
				return this.createDefault(qrCodeAlg);
		}
	}
	return this.createDefault(qrCodeAlg);
};
/**
 * 使用Canvas来画二维码
 * @return {}
 */

qrcode.prototype.createDefault = function(qrCodeAlg) {
	var canvas = document.createElement('canvas');
	if(canvas.getContext)
		return this.createCanvas(qrCodeAlg);
	SVG_NS = 'http://www.w3.org/2000/svg';
  	if( !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect )
  		return this.createSVG(qrCodeAlg);
	return this.createTable(qrCodeAlg);
};
qrcode.prototype.createCanvas = function(qrCodeAlg) {
	//创建canvas节点
	var canvas = document.createElement('canvas');
	canvas.width = this.options.width;
	canvas.height = this.options.height;
	var ctx = canvas.getContext('2d');

	//计算每个点的长宽
	var tileW = (this.options.width / qrCodeAlg.getModuleCount()).toPrecision(4);
	var tileH = this.options.height / qrCodeAlg.getModuleCount().toPrecision(4);

	//绘制
	for (var row = 0; row < qrCodeAlg.getModuleCount(); row++) {
		for (var col = 0; col < qrCodeAlg.getModuleCount(); col++) {
			ctx.fillStyle = qrCodeAlg.modules[row][ col] ? this.options.foreground : this.options.background;
			var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
			var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
			ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
		}
	}
	//返回绘制的节点
	return canvas;
};
/**
 * 使用table来绘制二维码
 * @return {}
 */
qrcode.prototype.createTable = function(qrCodeAlg) {
	//创建table节点
	var s = [];
	s.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: '+
		this.options.background +
		';">');
	// 计算每个节点的长宽；取整，防止点之间出现分离
	var tileW = -1, tileH = -1, caculateW = -1, caculateH = -1;
	tileW = caculateW = Math.floor(this.options.width / qrCodeAlg.getModuleCount());
	tileH = caculateH = Math.floor(this.options.height / qrCodeAlg.getModuleCount());
	if(caculateW <= 0){
		if(qrCodeAlg.getModuleCount() < 80){
			tileW = 2;
		} else {
			tileW = 1;
		}
	}
	if(caculateH <= 0){
		if(qrCodeAlg.getModuleCount() < 80){
			tileH = 2;
		} else {
			tileH = 1;
		}
	}

	// 绘制二维码
			foreTd = '<td style="border:0px; margin:0px; padding:0px; width:'+tileW+'px; background-color: '+this.options.foreground+'"></td>',
			backTd = '<td style="border:0px; margin:0px; padding:0px; width:'+tileW+'px; background-color: '+this.options.background+'"></td>',
  		l =  qrCodeAlg.getModuleCount();

	for (var row = 0; row < l; row++) {
		s.push('<tr style="border:0px; margin:0px; padding:0px; height: ' + tileH +'px">');
		for (var col = 0; col < l; col++) {
			s.push(qrCodeAlg.modules[row][col] ? foreTd : backTd);
		}
		s.push('</tr>');
	}
	s.push('</table>');
	var span = document.createElement("span");
  span.innerHTML=s.join('');

	return span.firstChild;
};

/**
 * 使用SVG开绘制二维码
 * @return {}
 */
qrcode.prototype.createSVG = function (qrCodeAlg){
    var x, dx, y, dy,
    	  moduleCount = qrCodeAlg.getModuleCount(),
    	  scale = this.options.height / this.options.width,
    	  svg = '<svg xmlns="http://www.w3.org/2000/svg" '
      	    + 'width="'+ this.options.width + 'px" height="' + this.options.height + 'px" '
                  + 'viewbox="0 0 ' + moduleCount * 10 + ' ' + moduleCount * 10 * scale + '">',
        rectHead = '<path ',
        foreRect = ' style="stroke-width:0.5;stroke:' + this.options.foreground
            + ';fill:' + this.options.foreground + ';"></path>',
        backRect = ' style="stroke-width:0.5;stroke:' + this.options.background
            + ';fill:' + this.options.background + ';"></path>';

    // draw in the svg
    for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
            x = col * 10;
            y = row * 10 * scale;
            dx = (col + 1) * 10;
            dy = (row + 1) * 10 * scale;
            
            svg += rectHead + 'd="M ' + x + ',' + y
                + ' L ' + dx + ',' + y
                + ' L ' + dx + ',' + dy
                + ' L ' + x + ',' + dy
                + ' Z"';
                
            svg += qrCodeAlg.modules[row][ col] ? foreRect : backRect;
        }
    }

    svg += '</svg>';

    // return just built svg
    return $(svg)[0];
};

module.exports = qrcode;

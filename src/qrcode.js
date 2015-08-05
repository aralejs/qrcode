var $ = require('jquery');
var QRCodeAlg = require('./qrcodealg');
var qrcodeAlgObjCache = [];
/**
* 预载图片
*/
var loadImage = function(url,callback){
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(this);
        img.onload = null
    };
}
/**
* 计算矩阵点的前景色
* @param {Obj} config
* @param {Number} config.row 点x坐标
* @param {Number} config.col 点y坐标
* @param {Number} config.count 矩阵大小
* @param {Number} config.options 组件的options
* @return {String} 
*/
var getForeGround = function(config){
    var options = config.options;
    if( options.pdground && (
        (config.row > 1 && config.row < 5 && config.col >1 && config.col<5) 
        || (config.row > (config.count - 6) && config.row < (config.count - 2) && config.col >1 && config.col<5)
        || (config.row > 1 && config.row < 5 && config.col > (config.count - 6) && config.col < (config.count - 2)) 
    )){
        return options.pdground;
    }
    return options.foreground;
}
/**
* 点是否在Position Detection
* @param  {row} 矩阵行
* @param  {col} 矩阵列
* @param  {count} 矩阵大小
* @return {Boolean}
*/
var inPositionDetection = function(row, col, count){
    if( 
        (row<7 && col<7) 
        || (row > (count - 8) && col < 7)
        || (row < 7 && col >(count - 8) ) 
    ){
        return true;
    }
    return false;
}

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
		foreground: "#000000",
        image : '',
        imageWidth: 30,
        imageHeight: 30
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
    var that = this;
	var canvas = document.createElement('canvas');
	canvas.width = that.options.width;
	canvas.height = that.options.height;
	var ctx = canvas.getContext('2d');
    var count = qrCodeAlg.getModuleCount();

	//计算每个点的长宽
	var tileW = (that.options.width / count).toPrecision(4);
	var tileH = (that.options.height / count).toPrecision(4);
    //绘制
    
	for (var row = 0; row < count; row++) {
		for (var col = 0; col < count; col++) {
            var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
            var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
            var foreground = getForeGround({
                row : row,
                col : col,
                count : count,
                options : that.options
            });
            ctx.fillStyle = qrCodeAlg.modules[row][col] ? foreground : that.options.background;
            ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
		}
	}
    if(that.options.image){
        loadImage(that.options.image, function(img){
            var x = ((that.options.width - that.options.imageWidth)/2).toFixed(2);
            var y = ((that.options.height - that.options.imageHeight)/2).toFixed(2);
            ctx.drawImage(img, x, y, that.options.imageWidth, that.options.imageHeight);
        });
    }
	//返回绘制的节点
	return canvas;
};
/**
 * 使用table来绘制二维码
 * @return {}
 */
qrcode.prototype.createTable = function(qrCodeAlg) {
	var count = qrCodeAlg.getModuleCount();
   
	// 计算每个节点的长宽；取整，防止点之间出现分离
	var tileW = Math.floor(this.options.width / count);
	var tileH = Math.floor(this.options.height / count);
	if(tileW <= 0){
		tileW = count < 80 ? 2 : 1;
	}
	if(tileH <= 0){
		tileH = count < 80 ? 2 : 1;
	}

    //创建table节点
    //重算码大小
    var s = [];
    s.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: '+
        this.options.background +
        ';">');

	// 绘制二维码
	var backTd = '<td style="border:0px; margin:0px; padding:0px; width:'+tileW+'px; background-color: '+this.options.background+'"></td>';

	for (var row = 0; row < count; row++) {
		s.push('<tr style="border:0px; margin:0px; padding:0px; height: ' + tileH +'px">');
		for (var col = 0; col < count; col++) {
            var foreground = getForeGround({
                row : row,
                col : col,
                count : count,
                options : this.options
            });
			s.push(qrCodeAlg.modules[row][col] ? '<td style="border:0px; margin:0px; padding:0px; width:'+tileW+'px; background-color: '+ foreground+'"></td>' : backTd);
		}
		s.push('</tr>');
	}
	s.push('</table>');

    if(this.options.image){
        // 计算表格的总大小
        var width = tileW * count;
        var height = tileH * count;
        var x = ((width - this.options.imageWidth)/2).toFixed(2);
        var y = ((height - this.options.imageHeight)/2).toFixed(2);
        s.unshift('<div style="position: relative;width:'+
            width+'px; height: '+
            height+'px;">');
        s.push('<img src="'+ this.options.image +'" width="'+ 
            this.options.imageWidth +'" height="'+ 
            this.options.imageHeight +'" style="position:absolute;'+
            'left:'+ x +'px; top:'+ y +'px;">');
        s.push('</div>');
    }

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
        count = qrCodeAlg.getModuleCount(),
    	scale = this.options.height / this.options.width,
    	svg = '<svg xmlns="http://www.w3.org/2000/svg" '
      	    + 'width="'+ this.options.width + 'px" height="' + this.options.height + 'px" '
            + 'viewbox="0 0 ' + count * 10 + ' ' + count * 10 * scale + '">',
        rectHead = '<path ',
        backRect = ' style="stroke-width:0.5;stroke:' + this.options.background
            + ';fill:' + this.options.background + ';"></path>';

    // draw in the svg
    for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
            var foreground = getForeGround({
                row : row,
                col : col,
                count : count,
                options : this.options
            });
            var foreRect = ' style="stroke-width:0.5;stroke:' + foreground 
                + ';fill:' + foreground + ';"></path>';
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

    if(this.options.image){
        var x = ((this.options.width - this.options.imageWidth)/2).toFixed(2);
        var y = ((this.options.height - this.options.imageHeight)/2).toFixed(2);
        svg += '<image xlink:href="'+ this.options.image + '" x="'+ x +'" y="'+ y +'" width="'+ this.options.imageWidth +'" height="'+ this.options.imageHeight +'"/>';
    }

    svg += '</svg>';

    // return just built svg
    return $(svg)[0];
};

module.exports = qrcode;
